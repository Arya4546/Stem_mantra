import { z } from 'zod';
import { boolQuery, optionalText, optionalUrl, pageQuery, requiredText, uuid } from '../../shared/utils/schemas';

export const clientCreateSchema = z.object({
  name: requiredText(2, 150, 'School / organisation name'),
  logoId: uuid.nullable().optional(),
  location: optionalText(120),
  description: optionalText(2000),
  websiteUrl: optionalUrl,
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().default(true),
});

export const clientUpdateSchema = clientCreateSchema.partial();

export const clientListQuery = z.object({
  q: z.string().trim().max(100).optional(),
  status: z.enum(['all', 'published', 'hidden']).default('all'),
  featured: boolQuery,
  ...pageQuery,
  limit: z.coerce.number().int().min(1).max(500).default(100),
});

export type ClientCreateInput = z.infer<typeof clientCreateSchema>;
export type ClientUpdateInput = z.infer<typeof clientUpdateSchema>;
export type ClientListQuery = z.infer<typeof clientListQuery>;
