import { z } from 'zod';
import { optionalText, pageQuery, requiredText, uuid } from '../../shared/utils/schemas';

const tags = z
  .array(z.string().trim().min(1).max(40))
  .max(10, 'Use at most 10 tags')
  .transform((list) => [...new Set(list.map((t) => t.replace(/\s+/g, ' ')))]);

export const postCreateSchema = z.object({
  title: requiredText(3, 200, 'Title'),
  slug: z
    .string()
    .trim()
    .max(200)
    .transform((v) => (v === '' ? undefined : v))
    .optional(),
  excerpt: optionalText(400),
  content: z.string().max(300_000, 'The post is too long').default(''),
  coverId: uuid.nullable().optional(),
  coverAlt: optionalText(250),
  metaTitle: optionalText(70),
  metaDescription: optionalText(170),
  tags: tags.default([]),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

export const postUpdateSchema = postCreateSchema.partial();

export const adminPostListQuery = z.object({
  q: z.string().trim().max(100).optional(),
  status: z.enum(['all', 'DRAFT', 'PUBLISHED']).default('all'),
  ...pageQuery,
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const publicPostListQuery = z.object({
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(24).default(9),
  tag: z.string().trim().max(40).optional(),
});

export const slugParam = z.object({ slug: z.string().trim().min(1).max(220).regex(/^[a-z0-9-]+$/) });

export type PostCreateInput = z.infer<typeof postCreateSchema>;
export type PostUpdateInput = z.infer<typeof postUpdateSchema>;
export type AdminPostListQuery = z.infer<typeof adminPostListQuery>;
export type PublicPostListQuery = z.infer<typeof publicPostListQuery>;
