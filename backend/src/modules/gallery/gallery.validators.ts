import { z } from 'zod';
import { boolQuery, optionalText, pageQuery, requiredText, uuid } from '../../shared/utils/schemas';

export const ACCENTS = ['orange', 'teal', 'blue', 'indigo', 'purple', 'pink', 'green', 'amber', 'rose', 'slate'] as const;

export const categoryCreateSchema = z.object({
  name: requiredText(2, 80, 'Name'),
  tagline: optionalText(60),
  description: optionalText(500),
  accent: z.enum(ACCENTS).default('orange'),
  layout: z.enum(['GRID', 'MASONRY']).default('GRID'),
  isActive: z.boolean().default(true),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

export const categoryDeleteQuery = z.object({ moveTo: uuid.optional() });

const imageFields = {
  title: optionalText(150),
  altText: optionalText(250),
  caption: optionalText(500),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
};

export const imageCreateSchema = z.object({ categoryId: uuid, mediaId: uuid, ...imageFields });

export const imageBulkCreateSchema = z.object({
  categoryId: uuid,
  isPublished: z.boolean().default(true),
  items: z
    .array(z.object({ mediaId: uuid, title: optionalText(150), altText: optionalText(250), caption: optionalText(500) }))
    .min(1, 'Add at least one image')
    .max(50, 'Add at most 50 images at a time'),
});

export const imageUpdateSchema = z.object({ categoryId: uuid.optional(), mediaId: uuid.optional(), ...imageFields });

export const imageListQuery = z.object({
  categoryId: uuid.optional(),
  q: z.string().trim().max(100).optional(),
  status: z.enum(['all', 'published', 'hidden']).default('all'),
  featured: boolQuery,
  ...pageQuery,
  // The admin loads a whole gallery type at once so it can be re-ordered by drag & drop.
  limit: z.coerce.number().int().min(1).max(1000).default(48),
});

export const imageBulkActionSchema = z
  .object({
    ids: z.array(uuid).min(1).max(200),
    action: z.enum(['publish', 'unpublish', 'feature', 'unfeature', 'move', 'delete']),
    categoryId: uuid.optional(),
  })
  .refine((v) => v.action !== 'move' || Boolean(v.categoryId), { message: 'Choose a category', path: ['categoryId'] });

export const imageReorderSchema = z.object({
  categoryId: uuid,
  ids: z.array(uuid).min(1).max(1000),
});

export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
export type ImageCreateInput = z.infer<typeof imageCreateSchema>;
export type ImageBulkCreateInput = z.infer<typeof imageBulkCreateSchema>;
export type ImageUpdateInput = z.infer<typeof imageUpdateSchema>;
export type ImageListQuery = z.infer<typeof imageListQuery>;
export type ImageBulkActionInput = z.infer<typeof imageBulkActionSchema>;
