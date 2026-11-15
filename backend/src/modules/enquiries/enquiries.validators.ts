import { z } from 'zod';
import { optionalText, pageQuery, uuid } from '../../shared/utils/schemas';

export const enquirySubmitSchema = z
  .object({
    type: z.enum(['contact', 'demo']).default('contact'),
    name: z.string().trim().min(2, 'Please enter your name').max(100, 'Name is too long'),
    email: z.string().trim().toLowerCase().email('Please enter a valid email address').max(150),
    phone: z
      .string()
      .trim()
      .max(30)
      .refine((v) => v === '' || /^[0-9+()\-\s]{7,20}$/.test(v), 'Please enter a valid phone number')
      .optional(),
    school: optionalText(200),
    interest: optionalText(100),
    message: z.string().trim().max(3000, 'Message is too long (max 3000 characters)').optional(),
    sourcePath: z.string().trim().max(300).optional(),
    /** Honeypot: humans never see this field. */
    hp_trap: z.string().max(500).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.type === 'contact' && (v.message ?? '').length < 5) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['message'], message: 'Please enter your message' });
    }
  });

export const enquiryListQuery = z.object({
  status: z.enum(['all', 'NEW', 'READ', 'ARCHIVED']).default('all'),
  type: z.enum(['all', 'CONTACT', 'DEMO']).default('all'),
  q: z.string().trim().max(100).optional(),
  ...pageQuery,
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export const enquiryUpdateSchema = z.object({ status: z.enum(['NEW', 'READ', 'ARCHIVED']) });

export const enquiryBulkSchema = z.object({
  ids: z.array(uuid).min(1).max(200),
  action: z.enum(['read', 'unread', 'archive', 'delete']),
});

export type EnquirySubmitInput = z.infer<typeof enquirySubmitSchema>;
export type EnquiryListQuery = z.infer<typeof enquiryListQuery>;
