import type { Request } from 'express';
import type { Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { AppError } from '../../shared/errors/app-error';
import { audit } from '../../shared/utils/audit';
import { b2 } from '../../shared/utils/b2-storage';
import { cache, CacheKeys } from '../../shared/utils/cache';
import { applyOrder } from '../../shared/utils/reorder';
import { mediaSelect, releaseAssets, toMediaDto, type MediaDto } from '../media/media.service';
import type { TestimonialCreateInput, TestimonialUpdateInput } from './testimonials.validators';

export interface PublicTestimonial {
  id: string;
  authorName: string;
  designation: string | null;
  organization: string | null;
  content: string;
  rating: number;
  photo: MediaDto | null;
}

const include = { photo: { select: mediaSelect } } as const;
type WithPhoto = Prisma.TestimonialGetPayload<{ include: typeof include }>;

const toPublic = (t: WithPhoto): PublicTestimonial => ({
  id: t.id,
  authorName: t.authorName,
  designation: t.designation,
  organization: t.organization,
  content: t.content,
  rating: t.rating,
  photo: toMediaDto(t.photo),
});

const invalidate = () => cache.invalidate(CacheKeys.testimonials);

export function getPublicTestimonials(): Promise<PublicTestimonial[]> {
  return cache.wrap(`${CacheKeys.testimonials}public`, async () => {
    const rows = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include,
    });
    return rows.map(toPublic);
  });
}

export function listTestimonials() {
  return prisma.testimonial.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }], include });
}

async function assertMedia(tx: Prisma.TransactionClient, id: string | null | undefined) {
  if (!id) return;
  if (!(await tx.mediaAsset.findUnique({ where: { id }, select: { id: true } }))) {
    throw AppError.badRequest('The uploaded photo could not be found. Upload it again.');
  }
}

export async function createTestimonial(req: Request, input: TestimonialCreateInput) {
  const row = await prisma.$transaction(async (tx) => {
    await assertMedia(tx, input.photoId);
    const first = await tx.testimonial.aggregate({ _min: { sortOrder: true } });
    const created = await tx.testimonial.create({
      data: {
        authorName: input.authorName,
        designation: input.designation ?? null,
        organization: input.organization ?? null,
        photoId: input.photoId ?? null,
        content: input.content,
        rating: input.rating,
        isPublished: input.isPublished,
        sortOrder: (first._min.sortOrder ?? 0) - 1,
      },
      include,
    });
    await audit(req, { action: 'create', entity: 'testimonial', entityId: created.id, summary: created.authorName }, tx);
    return created;
  });
  invalidate();
  return row;
}

export async function updateTestimonial(req: Request, id: string, input: TestimonialUpdateInput) {
  let keys: string[] = [];
  const row = await prisma.$transaction(async (tx) => {
    const current = await tx.testimonial.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Testimonial');
    const photoChanged = input.photoId !== undefined && input.photoId !== current.photoId;
    if (photoChanged) await assertMedia(tx, input.photoId);

    const updated = await tx.testimonial.update({ where: { id }, data: input, include });
    if (photoChanged) keys = await releaseAssets(tx, [current.photoId]);
    await audit(req, { action: 'update', entity: 'testimonial', entityId: id, summary: updated.authorName }, tx);
    return updated;
  });
  await b2.removeMany(keys);
  invalidate();
  return row;
}

export async function deleteTestimonial(req: Request, id: string) {
  const keys = await prisma.$transaction(async (tx) => {
    const current = await tx.testimonial.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Testimonial');
    await tx.testimonial.delete({ where: { id } });
    const released = await releaseAssets(tx, [current.photoId]);
    await audit(req, { action: 'delete', entity: 'testimonial', entityId: id, summary: current.authorName }, tx);
    return released;
  });
  await b2.removeMany(keys);
  invalidate();
}

export async function reorderTestimonials(req: Request, ids: string[]) {
  await prisma.$transaction(async (tx) => {
    const [count, total] = await Promise.all([tx.testimonial.count({ where: { id: { in: ids } } }), tx.testimonial.count()]);
    if (count !== ids.length || total !== ids.length) throw AppError.badRequest('The list changed. Refresh and try again.');
    await applyOrder(tx, 'testimonial', ids);
    await audit(req, { action: 'reorder', entity: 'testimonial', summary: `${ids.length} testimonials` }, tx);
  });
  invalidate();
}
