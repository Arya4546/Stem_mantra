import path from 'path';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// The AWS SDK probes the EC2 metadata service for credentials when none are configured. We always pass
// explicit B2 keys, so disable the probe (it only adds startup latency on a VPS).
process.env.AWS_EC2_METADATA_DISABLED = 'true';

const boolish = z
  .union([z.boolean(), z.string()])
  .transform((v) => (typeof v === 'boolean' ? v : ['1', 'true', 'yes'].includes(v.toLowerCase())));

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  SITE_URL: z.string().url().default('http://localhost:3000'),
  TRUST_PROXY: z.coerce.number().int().min(0).default(1),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('http'),
  /** Print every SQL query with its duration to the terminal (defaults to on in development). */
  LOG_QUERIES: boolish.optional(),

  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection string'),

  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRY: z.string().regex(/^\d+[smhd]$/, 'Use a duration like 15m or 1h').default('15m'),
  JWT_REFRESH_EXPIRY_DAYS: z.coerce.number().int().min(1).max(90).default(7),

  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL must be a valid email'),
  ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD must be at least 8 characters'),
  ADMIN_FULL_NAME: z.string().min(1, 'ADMIN_FULL_NAME is required'),

  SMTP_HOST: z.string().default('smtp-relay.brevo.com'),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM_EMAIL: z.string().email().default('noreply@stemmantra.com'),
  MAIL_FROM_NAME: z.string().default('STEMmantra Website'),
  ENQUIRY_RECIPIENTS: z
    .string()
    .default('sales@stemmantra.com')
    .transform((v) => v.split(',').map((s) => s.trim()).filter(Boolean))
    .pipe(z.array(z.string().email()).min(1, 'ENQUIRY_RECIPIENTS needs at least one email')),

  BACKBLAZE_BUCKET_NAME: z.string().min(1, 'BACKBLAZE_BUCKET_NAME is required'),
  BACKBLAZE_ENDPOINT: z.string().url('BACKBLAZE_ENDPOINT must be a valid URL'),
  BACKBLAZE_REGION: z.string().min(1, 'BACKBLAZE_REGION is required'),
  BACKBLAZE_KEY_ID: z.string().min(1, 'BACKBLAZE_KEY_ID is required'),
  BACKBLAZE_APP_KEY: z.string().min(1, 'BACKBLAZE_APP_KEY is required'),
  B2_PREFIX: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'B2_PREFIX may only contain lowercase letters, digits and dashes')
    .default('website'),

  MAX_UPLOAD_MB: z.coerce.number().int().min(1).max(50).default(15),

  RATE_LIMIT_GLOBAL_LIMIT: z.coerce.number().int().positive().default(1500),
  RATE_LIMIT_AUTH_LIMIT: z.coerce.number().int().positive().default(20),
  RATE_LIMIT_ENQUIRY_LIMIT: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_UPLOAD_LIMIT: z.coerce.number().int().positive().default(300),

  /** Directory of the Next.js app that this server renders. */
  FRONTEND_DIR: z.string().default(path.resolve(__dirname, '../../../frontend')),
  /** Set to false to run the API without the Next.js frontend (e.g. API-only debugging). */
  SERVE_FRONTEND: boolish.default(true),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.issues.map((i) => `  • ${i.path.join('.')}: ${i.message}`).join('\n');
  console.error(`\n❌ Invalid environment variables:\n${formatted}\n`);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  LOG_QUERIES: parsed.data.LOG_QUERIES ?? parsed.data.NODE_ENV === 'development',
};
export const isProd = env.NODE_ENV === 'production';
