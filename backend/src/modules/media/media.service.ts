import crypto from 'crypto';
import type { MediaAsset } from '@prisma/client';
import { prisma, type Tx } from '../../database/prisma';
import { env } from '../../config/env';
import { logger } from '../../config/logger';
import { b2, mediaUrlForKey } from '../../shared/utils/b2-storage';
import { processImage, type UploadPurpose } from '../../shared/utils/image-processor';

export interface MediaDto {
  id: string;
  url: string;
  thumbUrl: string | null;
  width: number | null;
  height: number | null;
  blurDataUrl: string | null;
}

export const mediaSelect = {
  id: true,
  url: true,
  thumbUrl: true,
  width: true,
  height: true,
  blurDataUrl: true,
} as const;

export function toMediaDto(asset: Pick<MediaAsset, keyof typeof mediaSelect> | null | undefined): MediaDto | null {
  if (!asset) return null;
  return {
    id: asset.id,
    url: asset.url,
    thumbUrl: asset.thumbUrl,
    width: asset.width,
    height: asset.height,
    blurDataUrl: asset.blurDataUrl,
  };
}

/**
 * Processes an uploaded image, stores the variants in B2 and records the asset.
 * If the DB write fails the uploaded objects are removed again (no orphans in the bucket).
 */
export async function createUploadedAsset(params: {
  buffer: Buffer;
  originalName: string;
  purpose: UploadPurpose;
  userId: string;
}): Promise<MediaDto> {
  const image = await processImage(params.buffer, params.purpose);

  const id = crypto.randomUUID();
  const now = new Date();
  const folder = `${env.B2_PREFIX}/${params.purpose}/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
  const key = `${folder}/${id}.webp`;
  const thumbKey = image.thumb ? `${folder}/${id}-thumb.webp` : null;

  await b2.put(key, image.full, image.mimeType);
  if (thumbKey && image.thumb) {
    try {
      await b2.put(thumbKey, image.thumb, image.mimeType);
    } catch (err) {
      await b2.removeMany([key]);
      throw err;
    }
  }

  try {
    const asset = await prisma.mediaAsset.create({
      data: {
        id,
        storage: 'B2',
        key,
        thumbKey,
        url: mediaUrlForKey(key),
        thumbUrl: thumbKey ? mediaUrlForKey(thumbKey) : null,
        mimeType: image.mimeType,
        width: image.width,
        height: image.height,
        sizeBytes: image.full.length,
        blurDataUrl: image.blurDataUrl,
        originalName: params.originalName.slice(0, 255),
        purpose: params.purpose,
        createdById: params.userId,
      },
      select: mediaSelect,
    });
    return toMediaDto(asset)!;
  } catch (err) {
    await b2.removeMany([key, thumbKey]);
    throw err;
  }
}

/**
 * Inside a transaction: deletes the given assets if nothing references them any more and returns
 * the B2 keys to remove *after* the transaction commits.
 */
export async function releaseAssets(tx: Tx, assetIds: Array<string | null | undefined>): Promise<string[]> {
  const ids = [...new Set(assetIds.filter((x): x is string => Boolean(x)))];
  if (ids.length === 0) return [];

  const assets = await tx.mediaAsset.findMany({
    where: {
      id: { in: ids },
      galleryImages: { none: {} },
      clientLogos: { none: {} },
      testimonials: { none: {} },
      blogCovers: { none: {} },
    },
    select: { id: true, key: true, thumbKey: true, url: true, storage: true },
  });
  if (assets.length === 0) return [];

  // Inline blog images are referenced by URL inside post HTML.
  const stillInline = new Set<string>();
  for (const a of assets) {
    const used = await tx.blogPost.count({ where: { content: { contains: a.url } } });
    if (used > 0) stillInline.add(a.id);
  }
  const deletable = assets.filter((a) => !stillInline.has(a.id));
  if (deletable.length === 0) return [];

  await tx.mediaAsset.deleteMany({ where: { id: { in: deletable.map((a) => a.id) } } });
  return deletable.flatMap((a) => (a.storage === 'B2' ? [a.key, a.thumbKey] : [])).filter((k): k is string => Boolean(k));
}

/**
 * Removes uploads that were never attached to anything (e.g. the admin closed the form after
 * uploading). Inline blog images get a longer grace period because drafts can sit for a while.
 */
export async function cleanupOrphanMedia(): Promise<number> {
  const dayAgo = new Date(Date.now() - 24 * 3600 * 1000);
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000);

  const candidates = await prisma.mediaAsset.findMany({
    where: {
      storage: 'B2',
      OR: [
        { purpose: { not: 'blog-inline' }, createdAt: { lt: dayAgo } },
        { purpose: 'blog-inline', createdAt: { lt: weekAgo } },
      ],
      galleryImages: { none: {} },
      clientLogos: { none: {} },
      testimonials: { none: {} },
      blogCovers: { none: {} },
    },
    select: { id: true },
    take: 200,
  });
  if (candidates.length === 0) return 0;

  const keys = await prisma.$transaction((tx) => releaseAssets(tx, candidates.map((c) => c.id)));
  await b2.removeMany(keys);
  const removed = keys.length;
  if (removed > 0) logger.info(`Media cleanup removed ${removed} orphaned object(s)`);
  return removed;
}
