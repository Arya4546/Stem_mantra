import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { prisma } from './prisma';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { slugify } from '../shared/utils/slug';
import { readImageSize } from '../shared/utils/image-processor';
import initial from './seed-data/initial-content.json';

const MARKER = 'seed.initial-content.v1';

/** The gallery sections that existed on the static site, in page order. */
const CATEGORIES = [
  {
    name: 'Session in Action',
    tagline: 'Hands-on Learning',
    accent: 'orange',
    layout: 'GRID' as const,
    description:
      'Witness the sheer joy of hands-on learning as our students actively build, code, and explore real-world robotics and IoT applications.',
  },
  {
    name: 'Our Labs',
    tagline: 'Our Infrastructure',
    accent: 'blue',
    layout: 'GRID' as const,
    description:
      'Tour our state-of-the-art STEM facilities where students transform complex theories into working prototypes using industry-grade tools.',
  },
  {
    name: 'STEMmantra Exhibition',
    tagline: 'Student Showcases',
    accent: 'teal',
    layout: 'GRID' as const,
    description:
      'A spotlight on major academic showcases, fairs, and competitions where our young inventors proudly present their technological creations.',
  },
  {
    name: 'STEMmantra In Media',
    tagline: 'Press & Coverage',
    accent: 'indigo',
    layout: 'MASONRY' as const,
    description:
      'Discover our impact across India, featured by esteemed publications and local media covering our push toward a future-ready education.',
  },
];

interface LocalAsset {
  url: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

async function describeLocal(url: string): Promise<LocalAsset> {
  const file = path.join(env.FRONTEND_DIR, 'public', url);
  if (!fs.existsSync(file)) return { url };
  const size = await readImageSize(file);
  let blurDataUrl: string | undefined;
  try {
    const buf = await sharp(file).rotate().resize({ width: 24, height: 24, fit: 'inside' }).webp({ quality: 40 }).toBuffer();
    blurDataUrl = `data:image/webp;base64,${buf.toString('base64')}`;
  } catch {
    /* placeholder is optional */
  }
  return { url, ...size, blurDataUrl };
}

const mimeFor = (url: string) =>
  url.endsWith('.png') ? 'image/png' : url.endsWith('.webp') ? 'image/webp' : 'image/jpeg';

/**
 * One-time import of the photos, client logos and testimonials that shipped with the static site,
 * so admins can manage them alongside new uploads. Guarded by a marker row: deleting imported
 * items later never brings them back.
 */
export async function seedInitialContent(): Promise<void> {
  const done = await prisma.appSetting.findUnique({ where: { key: MARKER } });
  if (done) return;

  const started = Date.now();
  logger.info('Importing the existing gallery, clients and testimonials…');

  // Read image metadata outside the transaction (file IO + sharp can take a few seconds).
  const urls = [
    ...initial.gallery.map((g) => g.src),
    ...initial.clients.map((c) => c.logo),
    ...initial.testimonials.map((t) => t.photo).filter((p): p is string => Boolean(p)),
  ];
  const assets = new Map<string, LocalAsset>();
  for (const url of new Set(urls)) assets.set(url, await describeLocal(url));

  await prisma.$transaction(
    async (tx) => {
      // Re-check inside the transaction (two instances starting at once).
      if (await tx.appSetting.findUnique({ where: { key: MARKER } })) return;

      const mediaIds = new Map<string, string>();
      for (const asset of assets.values()) {
        const created = await tx.mediaAsset.create({
          data: {
            storage: 'LOCAL',
            url: asset.url,
            mimeType: mimeFor(asset.url),
            width: asset.width ?? null,
            height: asset.height ?? null,
            blurDataUrl: asset.blurDataUrl ?? null,
            purpose: 'seed',
          },
        });
        mediaIds.set(asset.url, created.id);
      }

      const categoryIds = new Map<string, string>();
      for (const [index, c] of CATEGORIES.entries()) {
        const existing = await tx.galleryCategory.findUnique({ where: { name: c.name } });
        const category =
          existing ?? (await tx.galleryCategory.create({ data: { ...c, slug: slugify(c.name), sortOrder: index } }));
        categoryIds.set(c.name, category.id);
      }

      const perCategoryIndex = new Map<string, number>();
      for (const g of initial.gallery) {
        const categoryId = categoryIds.get(g.category);
        const mediaId = mediaIds.get(g.src);
        if (!categoryId || !mediaId) continue;
        const position = perCategoryIndex.get(categoryId) ?? 0;
        perCategoryIndex.set(categoryId, position + 1);
        await tx.galleryImage.create({
          data: {
            categoryId,
            mediaId,
            altText: g.alt.slice(0, 250),
            caption: g.caption?.slice(0, 500) ?? null,
            sortOrder: position,
            // The home page previously showed the first seven "Session in Action" photos.
            isFeatured: g.category === 'Session in Action' && position < 7,
          },
        });
      }

      for (const [index, c] of initial.clients.entries()) {
        await tx.client.create({
          data: { name: c.name, logoId: mediaIds.get(c.logo) ?? null, sortOrder: index, isFeatured: true },
        });
      }

      for (const [index, t] of initial.testimonials.entries()) {
        await tx.testimonial.create({
          data: {
            authorName: t.authorName,
            designation: t.designation,
            organization: t.organization,
            photoId: t.photo ? (mediaIds.get(t.photo) ?? null) : null,
            content: t.content.slice(0, 2000),
            sortOrder: index,
          },
        });
      }

      await tx.appSetting.create({ data: { key: MARKER, value: { importedAt: new Date().toISOString() } } });
    },
    { timeout: 60_000 },
  );

  logger.info(
    `✔ Imported ${initial.gallery.length} photos, ${initial.clients.length} clients, ${initial.testimonials.length} testimonials in ${Date.now() - started}ms`,
  );
}
