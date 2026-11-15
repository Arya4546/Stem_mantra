import { z } from 'zod';
import { optionalText, requiredText, uuid } from '../../shared/utils/schemas';

export const testimonialCreateSchema = z.object({
  authorName: requiredText(2, 120, 'Name'),
  designation: optionalText(120),
  organization: optionalText(200),
  photoId: uuid.nullable().optional(),
  content: requiredText(20, 2000, 'Testimonial'),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  isPublished: z.boolean().default(true),
});

export const testimonialUpdateSchema = testimonialCreateSchema.partial();

export type TestimonialCreateInput = z.infer<typeof testimonialCreateSchema>;
export type TestimonialUpdateInput = z.infer<typeof testimonialUpdateSchema>;
