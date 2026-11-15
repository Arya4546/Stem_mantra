import type { Request } from 'express';
import rateLimit from 'express-rate-limit';
import { env } from './env';

const base = { standardHeaders: 'draft-7' as const, legacyHeaders: false };

const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

/**
 * Server-side rendering calls the public API over loopback from inside this same process, so
 * without this every page view on the site would share one "127.0.0.1" bucket and busy periods
 * (or a crawler) would empty the gallery/clients sections with 429s. Visitor traffic always
 * arrives through nginx, which sets X-Forwarded-For, so it can never match this.
 */
export function isInternalRequest(req: Request): boolean {
  return LOOPBACK.has(req.socket.remoteAddress ?? '') && req.headers['x-forwarded-for'] === undefined;
}

/** Applied to every /api request (except the server's own loopback calls). */
export const globalLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: env.RATE_LIMIT_GLOBAL_LIMIT,
  skip: isInternalRequest,
  message: { success: false, message: 'Too many requests. Please try again later.', data: null },
});

/** Login / refresh. Successful logins do not count against the limit. */
export const authLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: env.RATE_LIMIT_AUTH_LIMIT,
  skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.', data: null },
});

/** Public contact / demo forms. */
export const enquiryLimiter = rateLimit({
  ...base,
  windowMs: 60 * 60 * 1000,
  limit: env.RATE_LIMIT_ENQUIRY_LIMIT,
  message: {
    success: false,
    message: 'Too many submissions from your network. Please try again later or reach us on WhatsApp.',
    data: null,
  },
});

/** Admin image uploads. */
export const uploadLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: env.RATE_LIMIT_UPLOAD_LIMIT,
  message: { success: false, message: 'Upload rate exceeded. Please wait a few minutes.', data: null },
});
