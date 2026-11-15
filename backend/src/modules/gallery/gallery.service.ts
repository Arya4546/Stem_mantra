import type { Request } from 'express';
import type { Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { AppError } from '../../shared/errors/app-error';
import { audit } from '../../shared/utils/audit';
import { b2 } from '../../shared/utils/b2-storage';
import { cache, CacheKeys } from '../../shared/utils/cache';
import { applyOrder } from '../../shared/utils/reorder';
import { slugify, uniqueSlug } from '../../shared/utils/slug';
import { paginationMeta } from '../../shared/utils/response';
import { mediaSelect, releaseAssets, toMediaDto, type MediaDto } from '../media/media.service';
import type {
  CategoryCreateInput,
  CategoryUpdateInput,
  ImageBulkActionInput,
  ImageBulkCreateInput,
  ImageCreateInput,
  ImageListQuery,
  ImageUpdateInput,
} from './gallery.validators';

// ─────────────────────────────────────────────────────────────
// DTOs
// ─────────────────────────────────────────────────────────────

export interface PublicGalleryImage {
  id: string;
  title: string | null;
  altText: string;
  caption: string | null;
  media: MediaDto;
}

export interface PublicGalleryCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  accent: string;
  layout: 'GRID' | 'MASONRY';
  images: PublicGalleryImage[];
}

const imageInclude = { media: { select: mediaSelect } } as const;

type ImageWithMedia = Prisma.GalleryImageGetPayload<{ include: typeof imageInclude }>;

function toPublicImage(img: ImageWithMedia): PublicGalleryImage {
  return { id: img.id, title: img.title, altText: img.altText, caption: img.caption, media: toMediaDto(img.media)! };
}

function invalidate(): void {
  cache.invalidate(CacheKeys.gallery);
}

function defaultAlt(title: string | null | undefined, categoryName: string): string {
  return `${title?.trim() || categoryName} – STEMmantra`.slice(0, 250);
}

// ─────────────────────────────────────────────────────────────
// Public
// ─────────────────────────────────────────────────────────────

export function getPublicGallery(): Promise<PublicGalleryCategory[]> {
  return cache.wrap(`${CacheKeys.gallery}public`, async () => {
    const categories = await prisma.galleryCategory.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
        images: {
          where: { isPublished: true },
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
          include: imageInclude,
        },
      },
    });
    return categories
      .filter((c) => c.images.length > 0)
      .map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        tagline: c.tagline,
        description: c.description,
        accent: c.accent,
        layout: c.layout,
        images: c.images.map(toPublicImage),
      }));
  });
}

/** Home page preview: featured photos first, topped up with the most recent published ones. */
export function getFeaturedImages(limit: number): Promise<PublicGalleryImage[]> {
  return cache.wrap(`${CacheKeys.gallery}featured:${limit}`, async () => {
    const visible = { isPublished: true, category: { isActive: true } } as const;
    const featured = await prisma.galleryImage.findMany({
      where: { ...visible, isFeatured: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: limit,
      include: imageInclude,
    });
    if (featured.length >= limit) return featured.map(toPublicImage);

    const filler = await prisma.galleryImage.findMany({
      where: { ...visible, id: { notIn: featured.map((f) => f.id) } },
      orderBy: [{ createdAt: 'desc' }],
      take: limit - featured.length,
      include: imageInclude,
    });
    return [...featured, ...filler].map(toPublicImage);
  });
}

// ─────────────────────────────────────────────────────────────
// Admin: categories
// ─────────────────────────────────────────────────────────────

export async function listCategories() {
  const categories = await prisma.galleryCategory.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { images: true } } },
  });
  const published = await prisma.galleryImage.groupBy({
    by: ['categoryId'],
    where: { isPublished: true },
    _count: { _all: true },
  });
  const publishedMap = new Map(published.map((p) => [p.categoryId, p._count._all]));
  return categories.map(({ _count, ...c }) => ({
    ...c,
    imageCount: _count.images,
    publishedCount: publishedMap.get(c.id) ?? 0,
  }));
}

export async function createCategory(req: Request, input: CategoryCreateInput) {
  const category = await prisma.$transaction(async (tx) => {
    const exists = await tx.galleryCategory.findFirst({ where: { name: { equals: input.name, mode: 'insensitive' } } });
    if (exists) throw AppError.conflict('A gallery type with this name already exists', { name: 'Already exists' });

    const slug = await uniqueSlug(slugify(input.name), async (s) => (await tx.galleryCategory.count({ where: { slug: s } })) > 0);
    const last = await tx.galleryCategory.aggregate({ _max: { sortOrder: true } });
    const created = await tx.galleryCategory.create({
      data: { ...input, slug, sortOrder: (last._max.sortOrder ?? -1) + 1 },
    });
    await audit(req, { action: 'create', entity: 'gallery_category', entityId: created.id, summary: created.name }, tx);
    return created;
  });
  invalidate();
  return category;
}

export async function updateCategory(req: Request, id: string, input: CategoryUpdateInput) {
  const category = await prisma.$transaction(async (tx) => {
    const current = await tx.galleryCategory.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Gallery type');

    let slug: string | undefined;
    if (input.name && input.name !== current.name) {
      const clash = await tx.galleryCategory.findFirst({
        where: { id: { not: id }, name: { equals: input.name, mode: 'insensitive' } },
      });
      if (clash) throw AppError.conflict('A gallery type with this name already exists', { name: 'Already exists' });
      slug = await uniqueSlug(
        slugify(input.name),
        async (s) => (await tx.galleryCategory.count({ where: { slug: s, id: { not: id } } })) > 0,
      );
    }
    const updated = await tx.galleryCategory.update({ where: { id }, data: { ...input, ...(slug ? { slug } : {}) } });
    await audit(req, { action: 'update', entity: 'gallery_category', entityId: id, summary: updated.name }, tx);
    return updated;
  });
  invalidate();
  return category;
}

/** A type that still has photos can only be deleted by moving its photos to another type. */
export async function deleteCategory(req: Request, id: string, moveTo?: string) {
  await prisma.$transaction(async (tx) => {
    const current = await tx.galleryCategory.findUnique({
      where: { id },
      include: { _count: { select: { images: true } } },
    });
    if (!current) throw AppError.notFound('Gallery type');

    if (current._count.images > 0) {
      if (!moveTo) {
        throw AppError.conflict(
          `“${current.name}” still has ${current._count.images} photo(s). Move them to another type first.`,
        );
      }
      if (moveTo === id) throw AppError.badRequest('Choose a different gallery type to move the photos to');
      const target = await tx.galleryCategory.findUnique({ where: { id: moveTo } });
      if (!target) throw AppError.notFound('Target gallery type');
      await tx.galleryImage.updateMany({ where: { categoryId: id }, data: { categoryId: moveTo } });
    }
    await tx.galleryCategory.delete({ where: { id } });
    await audit(req, { action: 'delete', entity: 'gallery_category', entityId: id, summary: current.name }, tx);
  });
  invalidate();
}

export async function reorderCategories(req: Request, ids: string[]) {
  await prisma.$transaction(async (tx) => {
    const count = await tx.galleryCategory.count({ where: { id: { in: ids } } });
    if (count !== ids.length) throw AppError.badRequest('Some gallery types no longer exist. Refresh and try again.');
    await applyOrder(tx, 'galleryCategory', ids);
    await audit(req, { action: 'reorder', entity: 'gallery_category', summary: `${ids.length} types` }, tx);
  });
  invalidate();
}

// ─────────────────────────────────────────────────────────────
// Admin: images
// ─────────────────────────────────────────────────────────────

const adminImageInclude = {
  media: { select: mediaSelect },
  category: { select: { id: true, name: true, slug: true } },
} as const;

export async function listImages(query: ImageListQuery) {
  const where: Prisma.GalleryImageWhereInput = {
    ...(query.categoryId ? { categoryId: query.categoryId } : {}),
    ...(query.status === 'published' ? { isPublished: true } : query.status === 'hidden' ? { isPublished: false } : {}),
    ...(query.featured !== undefined ? { isFeatured: query.featured } : {}),
    ...(query.q
      ? {
          OR: [
            { title: { contains: query.q, mode: 'insensitive' } },
            { altText: { contains: query.q, mode: 'insensitive' } },
            { caption: { contains: query.q, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  const [items, total] = await prisma.$transaction([
    prisma.galleryImage.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      include: adminImageInclude,
    }),
    prisma.galleryImage.count({ where }),
  ]);
  return { items, pagination: paginationMeta(query.page, query.limit, total) };
}

async function assertMedia(tx: Prisma.TransactionClient, mediaIds: string[]) {
  const found = await tx.mediaAsset.count({ where: { id: { in: mediaIds } } });
  if (found !== new Set(mediaIds).size) throw AppError.badRequest('One of the uploaded images could not be found. Upload it again.');
}

/** New photos go to the top of their type. */
async function topSortOrder(tx: Prisma.TransactionClient, categoryId: string, count = 1): Promise<number> {
  const first = await tx.galleryImage.aggregate({ where: { categoryId }, _min: { sortOrder: true } });
  return (first._min.sortOrder ?? 0) - count;
}

export async function createImage(req: Request, input: ImageCreateInput) {
  const image = await prisma.$transaction(async (tx) => {
    const category = await tx.galleryCategory.findUnique({ where: { id: input.categoryId } });
    if (!category) throw AppError.notFound('Gallery type');
    await assertMedia(tx, [input.mediaId]);

    const created = await tx.galleryImage.create({
      data: {
        categoryId: input.categoryId,
        mediaId: input.mediaId,
        title: input.title ?? null,
        altText: input.altText || defaultAlt(input.title, category.name),
        caption: input.caption ?? null,
        isPublished: input.isPublished ?? true,
        isFeatured: input.isFeatured ?? false,
        sortOrder: await topSortOrder(tx, input.categoryId),
      },
      include: adminImageInclude,
    });
    await audit(req, { action: 'create', entity: 'gallery_image', entityId: created.id, summary: `${category.name}: ${created.altText}` }, tx);
    return created;
  });
  invalidate();
  return image;
}

export async function bulkCreateImages(req: Request, input: ImageBulkCreateInput) {
  const images = await prisma.$transaction(async (tx) => {
    const category = await tx.galleryCategory.findUnique({ where: { id: input.categoryId } });
    if (!category) throw AppError.notFound('Gallery type');
    await assertMedia(tx, input.items.map((i) => i.mediaId));

    const start = await topSortOrder(tx, input.categoryId, input.items.length);
    const created = [];
    for (const [index, item] of input.items.entries()) {
      created.push(
        await tx.galleryImage.create({
          data: {
            categoryId: input.categoryId,
            mediaId: item.mediaId,
            title: item.title ?? null,
            altText: item.altText || defaultAlt(item.title, category.name),
            caption: item.caption ?? null,
            isPublished: input.isPublished,
            sortOrder: start + index,
          },
          include: adminImageInclude,
        }),
      );
    }
    await audit(req, { action: 'bulk_create', entity: 'gallery_image', summary: `${created.length} photo(s) → ${category.name}` }, tx);
    return created;
  });
  invalidate();
  return images;
}

export async function updateImage(req: Request, id: string, input: ImageUpdateInput) {
  let replacedKeys: string[] = [];
  const image = await prisma.$transaction(async (tx) => {
    const current = await tx.galleryImage.findUnique({ where: { id }, include: { category: true } });
    if (!current) throw AppError.notFound('Photo');

    let category = current.category;
    let sortOrder: number | undefined;
    if (input.categoryId && input.categoryId !== current.categoryId) {
      const target = await tx.galleryCategory.findUnique({ where: { id: input.categoryId } });
      if (!target) throw AppError.notFound('Gallery type');
      category = target;
      sortOrder = await topSortOrder(tx, target.id);
    }
    if (input.mediaId && input.mediaId !== current.mediaId) await assertMedia(tx, [input.mediaId]);

    const updated = await tx.galleryImage.update({
      where: { id },
      data: {
        ...(input.categoryId ? { categoryId: input.categoryId } : {}),
        ...(input.mediaId ? { mediaId: input.mediaId } : {}),
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(input.altText !== undefined
          ? { altText: input.altText || defaultAlt(input.title ?? current.title, category.name) }
          : {}),
        ...(input.caption !== undefined ? { caption: input.caption } : {}),
        ...(input.isPublished !== undefined ? { isPublished: input.isPublished } : {}),
        ...(input.isFeatured !== undefined ? { isFeatured: input.isFeatured } : {}),
        ...(sortOrder !== undefined ? { sortOrder } : {}),
      },
      include: adminImageInclude,
    });

    if (input.mediaId && input.mediaId !== current.mediaId) {
      replacedKeys = await releaseAssets(tx, [current.mediaId]);
    }
    await audit(req, { action: 'update', entity: 'gallery_image', entityId: id, summary: updated.altText }, tx);
    return updated;
  });
  await b2.removeMany(replacedKeys);
  invalidate();
  return image;
}

export async function deleteImage(req: Request, id: string) {
  const keys = await prisma.$transaction(async (tx) => {
    const current = await tx.galleryImage.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Photo');
    await tx.galleryImage.delete({ where: { id } });
    const released = await releaseAssets(tx, [current.mediaId]);
    await audit(req, { action: 'delete', entity: 'gallery_image', entityId: id, summary: current.altText }, tx);
    return released;
  });
  await b2.removeMany(keys);
  invalidate();
}

export async function bulkAction(req: Request, input: ImageBulkActionInput) {
  let keys: string[] = [];
  const affected = await prisma.$transaction(async (tx) => {
    const images = await tx.galleryImage.findMany({ where: { id: { in: input.ids } }, select: { id: true, mediaId: true } });
    if (images.length === 0) throw AppError.notFound('Photos');
    const ids = images.map((i) => i.id);

    switch (input.action) {
      case 'publish':
      case 'unpublish':
        await tx.galleryImage.updateMany({ where: { id: { in: ids } }, data: { isPublished: input.action === 'publish' } });
        break;
      case 'feature':
      case 'unfeature':
        await tx.galleryImage.updateMany({ where: { id: { in: ids } }, data: { isFeatured: input.action === 'feature' } });
        break;
      case 'move': {
        const target = await tx.galleryCategory.findUnique({ where: { id: input.categoryId! } });
        if (!target) throw AppError.notFound('Gallery type');
        const start = await topSortOrder(tx, target.id, ids.length);
        for (const [index, imageId] of ids.entries()) {
          await tx.galleryImage.update({ where: { id: imageId }, data: { categoryId: target.id, sortOrder: start + index } });
        }
        break;
      }
      case 'delete':
        await tx.galleryImage.deleteMany({ where: { id: { in: ids } } });
        keys = await releaseAssets(tx, images.map((i) => i.mediaId));
        break;
    }
    await audit(req, { action: `bulk_${input.action}`, entity: 'gallery_image', summary: `${ids.length} photo(s)` }, tx);
    return ids.length;
  });
  await b2.removeMany(keys);
  invalidate();
  return affected;
}

export async function reorderImages(req: Request, categoryId: string, ids: string[]) {
  await prisma.$transaction(async (tx) => {
    const [count, total] = await Promise.all([
      tx.galleryImage.count({ where: { id: { in: ids }, categoryId } }),
      tx.galleryImage.count({ where: { categoryId } }),
    ]);
    if (count !== ids.length || total !== ids.length) {
      throw AppError.badRequest('The photo list changed. Refresh and try again.');
    }
    await applyOrder(tx, 'galleryImage', ids);
    await audit(req, { action: 'reorder', entity: 'gallery_image', summary: `${ids.length} photo(s)` }, tx);
  });
  invalidate();
}
