import type { Request } from 'express';
import type { Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { AppError } from '../../shared/errors/app-error';
import { audit } from '../../shared/utils/audit';
import { b2 } from '../../shared/utils/b2-storage';
import { cache, CacheKeys } from '../../shared/utils/cache';
import { paginationMeta } from '../../shared/utils/response';
import { htmlToText, readingMinutes, sanitizeBlogHtml } from '../../shared/utils/sanitize-html';
import { slugify, uniqueSlug } from '../../shared/utils/slug';
import { mediaSelect, releaseAssets, toMediaDto, type MediaDto } from '../media/media.service';
import type { AdminPostListQuery, PostCreateInput, PostUpdateInput, PublicPostListQuery } from './blog.validators';

export interface PublicPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover: MediaDto | null;
  coverAlt: string | null;
  tags: string[];
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
  authorName: string | null;
}

export interface PublicPost extends PublicPostSummary {
  contentHtml: string;
  metaTitle: string | null;
  metaDescription: string | null;
}

const summaryInclude = {
  cover: { select: mediaSelect },
  author: { select: { fullName: true } },
} as const;

type PostWithRelations = Prisma.BlogPostGetPayload<{ include: typeof summaryInclude }>;

function toSummary(p: PostWithRelations): PublicPostSummary {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    cover: toMediaDto(p.cover),
    coverAlt: p.coverAlt,
    tags: p.tags,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    updatedAt: p.updatedAt.toISOString(),
    readingMinutes: p.readingMinutes,
    authorName: p.author?.fullName ?? null,
  };
}

const invalidate = () => cache.invalidate(CacheKeys.blog);
/** Evaluated per query (a module-level Date would freeze "now" at startup). */
const published = () => ({ status: 'PUBLISHED' as const, publishedAt: { lte: new Date() } });

// ── Public ───────────────────────────────────────────────────

export function listPublishedPosts(query: PublicPostListQuery) {
  return cache.wrap(`${CacheKeys.blog}list:${query.page}:${query.limit}:${query.tag ?? ''}`, async () => {
    const where: Prisma.BlogPostWhereInput = {
      status: 'PUBLISHED',
      publishedAt: { lte: new Date() },
      ...(query.tag ? { tags: { has: query.tag } } : {}),
    };
    const [rows, total] = await prisma.$transaction([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        include: summaryInclude,
      }),
      prisma.blogPost.count({ where }),
    ]);
    return { items: rows.map(toSummary), pagination: paginationMeta(query.page, query.limit, total) };
  });
}

export function getPublishedPost(slug: string): Promise<{ post: PublicPost; related: PublicPostSummary[] } | null> {
  return cache.wrap(`${CacheKeys.blog}post:${slug}`, async () => {
    const post = await prisma.blogPost.findFirst({ where: { slug, ...published() }, include: summaryInclude });
    if (!post) return null;

    const related = await prisma.blogPost.findMany({
      where: {
        ...published(),
        id: { not: post.id },
        ...(post.tags.length ? { tags: { hasSome: post.tags } } : {}),
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      include: summaryInclude,
    });

    return {
      post: {
        ...toSummary(post),
        contentHtml: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
      },
      related: related.map(toSummary),
    };
  });
}

/** For the XML sitemap. */
export function listPublishedSlugs() {
  return cache.wrap(`${CacheKeys.blog}slugs`, () =>
    prisma.blogPost.findMany({
      where: published(),
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, updatedAt: true },
    }),
  );
}

// ── Admin ────────────────────────────────────────────────────

export async function listPosts(query: AdminPostListQuery) {
  const where: Prisma.BlogPostWhereInput = {
    ...(query.status !== 'all' ? { status: query.status } : {}),
    ...(query.q ? { title: { contains: query.q, mode: 'insensitive' } } : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.blogPost.findMany({
      where,
      orderBy: [{ updatedAt: 'desc' }],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        updatedAt: true,
        readingMinutes: true,
        tags: true,
        cover: { select: mediaSelect },
        author: { select: { fullName: true } },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);
  return { items, pagination: paginationMeta(query.page, query.limit, total) };
}

export async function getPost(id: string) {
  const post = await prisma.blogPost.findUnique({ where: { id }, include: summaryInclude });
  if (!post) throw AppError.notFound('Post');
  return post;
}

function deriveExcerpt(html: string): string | null {
  const text = htmlToText(html);
  if (!text) return null;
  if (text.length <= 220) return text;
  return `${text.slice(0, 217).replace(/\s+\S*$/, '')}…`;
}

async function resolveSlug(tx: Prisma.TransactionClient, requested: string | undefined, title: string, excludeId?: string) {
  const taken = async (s: string) =>
    (await tx.blogPost.count({ where: { slug: s, ...(excludeId ? { id: { not: excludeId } } : {}) } })) > 0;

  if (requested) {
    const slug = slugify(requested, 200);
    if (await taken(slug)) throw AppError.conflict('Another post already uses this URL', { slug: 'Already in use' });
    return slug;
  }
  return uniqueSlug(slugify(title, 200), taken);
}

async function assertCover(tx: Prisma.TransactionClient, id: string | null | undefined) {
  if (!id) return;
  if (!(await tx.mediaAsset.findUnique({ where: { id }, select: { id: true } }))) {
    throw AppError.badRequest('The cover image could not be found. Upload it again.');
  }
}

function assertPublishable(status: string, content: string) {
  if (status === 'PUBLISHED' && htmlToText(content).length < 50) {
    throw AppError.unprocessable('Write at least a few sentences before publishing', { content: 'Too short to publish' });
  }
}

export async function createPost(req: Request, input: PostCreateInput) {
  const content = sanitizeBlogHtml(input.content);
  assertPublishable(input.status, content);

  const post = await prisma.$transaction(async (tx) => {
    await assertCover(tx, input.coverId);
    const slug = await resolveSlug(tx, input.slug, input.title);
    const created = await tx.blogPost.create({
      data: {
        title: input.title,
        slug,
        excerpt: input.excerpt ?? deriveExcerpt(content),
        content,
        coverId: input.coverId ?? null,
        coverAlt: input.coverAlt ?? null,
        metaTitle: input.metaTitle ?? null,
        metaDescription: input.metaDescription ?? null,
        tags: input.tags,
        status: input.status,
        publishedAt: input.status === 'PUBLISHED' ? new Date() : null,
        readingMinutes: readingMinutes(content),
        authorId: req.user!.id,
      },
      include: summaryInclude,
    });
    await audit(req, { action: input.status === 'PUBLISHED' ? 'publish' : 'create', entity: 'blog_post', entityId: created.id, summary: created.title }, tx);
    return created;
  });
  invalidate();
  return post;
}

export async function updatePost(req: Request, id: string, input: PostUpdateInput) {
  let keys: string[] = [];
  const post = await prisma.$transaction(async (tx) => {
    const current = await tx.blogPost.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Post');

    const content = input.content !== undefined ? sanitizeBlogHtml(input.content) : current.content;
    const status = input.status ?? current.status;
    assertPublishable(status, content);

    const coverChanged = input.coverId !== undefined && input.coverId !== current.coverId;
    if (coverChanged) await assertCover(tx, input.coverId);

    const slug =
      input.slug !== undefined && slugify(input.slug, 200) !== current.slug
        ? await resolveSlug(tx, input.slug, input.title ?? current.title, id)
        : undefined;

    const updated = await tx.blogPost.update({
      where: { id },
      data: {
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(slug ? { slug } : {}),
        ...(input.content !== undefined ? { content, readingMinutes: readingMinutes(content) } : {}),
        ...(input.excerpt !== undefined ? { excerpt: input.excerpt ?? deriveExcerpt(content) } : {}),
        ...(input.coverId !== undefined ? { coverId: input.coverId } : {}),
        ...(input.coverAlt !== undefined ? { coverAlt: input.coverAlt } : {}),
        ...(input.metaTitle !== undefined ? { metaTitle: input.metaTitle } : {}),
        ...(input.metaDescription !== undefined ? { metaDescription: input.metaDescription } : {}),
        ...(input.tags !== undefined ? { tags: input.tags } : {}),
        ...(input.status !== undefined ? { status } : {}),
        ...(status === 'PUBLISHED' && !current.publishedAt ? { publishedAt: new Date() } : {}),
      },
      include: summaryInclude,
    });

    if (coverChanged) keys = await releaseAssets(tx, [current.coverId]);

    const action =
      input.status && input.status !== current.status ? (input.status === 'PUBLISHED' ? 'publish' : 'unpublish') : 'update';
    await audit(req, { action, entity: 'blog_post', entityId: id, summary: updated.title }, tx);
    return updated;
  });
  await b2.removeMany(keys);
  invalidate();
  return post;
}

export async function deletePost(req: Request, id: string) {
  const keys = await prisma.$transaction(async (tx) => {
    const current = await tx.blogPost.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Post');
    await tx.blogPost.delete({ where: { id } });
    // Inline images that only this post used are cleaned up by the periodic orphan job.
    const released = await releaseAssets(tx, [current.coverId]);
    await audit(req, { action: 'delete', entity: 'blog_post', entityId: id, summary: current.title }, tx);
    return released;
  });
  await b2.removeMany(keys);
  invalidate();
}
