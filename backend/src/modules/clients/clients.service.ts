import type { Request } from 'express';
import type { Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { AppError } from '../../shared/errors/app-error';
import { audit } from '../../shared/utils/audit';
import { b2 } from '../../shared/utils/b2-storage';
import { cache, CacheKeys } from '../../shared/utils/cache';
import { applyOrder } from '../../shared/utils/reorder';
import { paginationMeta } from '../../shared/utils/response';
import { mediaSelect, releaseAssets, toMediaDto, type MediaDto } from '../media/media.service';
import type { ClientCreateInput, ClientListQuery, ClientUpdateInput } from './clients.validators';

export interface PublicClient {
  id: string;
  name: string;
  location: string | null;
  description: string | null;
  websiteUrl: string | null;
  isFeatured: boolean;
  logo: MediaDto | null;
}

const include = { logo: { select: mediaSelect } } as const;
type ClientWithLogo = Prisma.ClientGetPayload<{ include: typeof include }>;

const toPublic = (c: ClientWithLogo): PublicClient => ({
  id: c.id,
  name: c.name,
  location: c.location,
  description: c.description,
  websiteUrl: c.websiteUrl,
  isFeatured: c.isFeatured,
  logo: toMediaDto(c.logo),
});

const invalidate = () => cache.invalidate(CacheKeys.clients);

export function getPublicClients(): Promise<PublicClient[]> {
  return cache.wrap(`${CacheKeys.clients}public`, async () => {
    const clients = await prisma.client.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include,
    });
    return clients.map(toPublic);
  });
}

export async function listClients(query: ClientListQuery) {
  const where: Prisma.ClientWhereInput = {
    ...(query.status === 'published' ? { isPublished: true } : query.status === 'hidden' ? { isPublished: false } : {}),
    ...(query.featured !== undefined ? { isFeatured: query.featured } : {}),
    ...(query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' } },
            { location: { contains: query.q, mode: 'insensitive' } },
          ],
        }
      : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.client.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      include,
    }),
    prisma.client.count({ where }),
  ]);
  return { items, pagination: paginationMeta(query.page, query.limit, total) };
}

async function assertMedia(tx: Prisma.TransactionClient, id: string | null | undefined) {
  if (!id) return;
  if (!(await tx.mediaAsset.findUnique({ where: { id }, select: { id: true } }))) {
    throw AppError.badRequest('The uploaded logo could not be found. Upload it again.');
  }
}

export async function createClient(req: Request, input: ClientCreateInput) {
  const client = await prisma.$transaction(async (tx) => {
    await assertMedia(tx, input.logoId);
    const first = await tx.client.aggregate({ _min: { sortOrder: true } });
    const created = await tx.client.create({
      data: {
        name: input.name,
        logoId: input.logoId ?? null,
        location: input.location ?? null,
        description: input.description ?? null,
        websiteUrl: input.websiteUrl ?? null,
        isPublished: input.isPublished,
        isFeatured: input.isFeatured,
        sortOrder: (first._min.sortOrder ?? 0) - 1,
      },
      include,
    });
    await audit(req, { action: 'create', entity: 'client', entityId: created.id, summary: created.name }, tx);
    return created;
  });
  invalidate();
  return client;
}

export async function updateClient(req: Request, id: string, input: ClientUpdateInput) {
  let keys: string[] = [];
  const client = await prisma.$transaction(async (tx) => {
    const current = await tx.client.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Client');
    if (input.logoId !== undefined && input.logoId !== current.logoId) await assertMedia(tx, input.logoId);

    const updated = await tx.client.update({ where: { id }, data: input, include });
    if (input.logoId !== undefined && input.logoId !== current.logoId) {
      keys = await releaseAssets(tx, [current.logoId]);
    }
    await audit(req, { action: 'update', entity: 'client', entityId: id, summary: updated.name }, tx);
    return updated;
  });
  await b2.removeMany(keys);
  invalidate();
  return client;
}

export async function deleteClient(req: Request, id: string) {
  const keys = await prisma.$transaction(async (tx) => {
    const current = await tx.client.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Client');
    await tx.client.delete({ where: { id } });
    const released = await releaseAssets(tx, [current.logoId]);
    await audit(req, { action: 'delete', entity: 'client', entityId: id, summary: current.name }, tx);
    return released;
  });
  await b2.removeMany(keys);
  invalidate();
}

export async function reorderClients(req: Request, ids: string[]) {
  await prisma.$transaction(async (tx) => {
    const [count, total] = await Promise.all([tx.client.count({ where: { id: { in: ids } } }), tx.client.count()]);
    if (count !== ids.length || total !== ids.length) throw AppError.badRequest('The client list changed. Refresh and try again.');
    await applyOrder(tx, 'client', ids);
    await audit(req, { action: 'reorder', entity: 'client', summary: `${ids.length} clients` }, tx);
  });
  invalidate();
}
