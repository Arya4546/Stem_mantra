import { z } from 'zod';

/** Trimmed optional text; empty strings become null so "clearing" a field works. */
export const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Use at most ${max} characters`)
    .transform((v) => (v === '' ? null : v))
    .nullable()
    .optional();

export const requiredText = (min: number, max: number, label: string) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .min(min, `${label} must be at least ${min} characters`)
    .max(max, `Use at most ${max} characters`);

export const uuid = z.string().uuid('Invalid id');

export const idParam = z.object({ id: uuid });

export const reorderSchema = z.object({
  ids: z.array(uuid).min(1).max(1000).refine((ids) => new Set(ids).size === ids.length, 'Duplicate ids'),
});

export const pageQuery = {
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
};

export const boolQuery = z
  .enum(['true', 'false'])
  .transform((v) => v === 'true')
  .optional();

export const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .transform((v) => (v === '' ? null : v))
  .refine((v) => v === null || /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v), 'Enter a full URL starting with https://')
  .nullable()
  .optional();
