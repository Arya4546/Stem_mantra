import type { NextFunction, Request, Response } from 'express';
import { env } from '../../config/env';
import { AppError } from '../errors/app-error';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const allowedOrigins = new Set([new URL(env.SITE_URL).origin]);

/**
 * CSRF protection for cookie-authenticated requests: every state-changing API call must come
 * from our own origin. Browsers always send `Origin` on cross-site POST/PATCH/DELETE, and
 * SameSite cookies already stop most cross-site requests; this is the second layer.
 */
export function sameOriginOnly(req: Request, _res: Response, next: NextFunction): void {
  if (SAFE_METHODS.has(req.method)) return next();

  const origin = req.get('origin');
  const host = req.get('host');
  const fromOrigin = origin ? safeOrigin(origin) : null;

  // Same host the request was sent to (covers localhost and any domain nginx forwards to us)
  const sameHost = fromOrigin !== null && host !== undefined && new URL(fromOrigin).host === host;
  if (fromOrigin && (allowedOrigins.has(fromOrigin) || sameHost)) return next();

  if (!origin) {
    // Non-browser clients (curl, server-side fetch) don't send Origin. Accept them only when they
    // don't carry our auth cookies — then there is nothing to forge.
    const hasAuthCookie = Boolean(req.cookies?.sm_at || req.cookies?.sm_rt);
    if (!hasAuthCookie) return next();
    const referer = req.get('referer');
    if (referer && host && safeHost(referer) === host) return next();
  }

  next(AppError.forbidden('Cross-site request blocked'));
}

/** Admin/auth responses must never be cached by browsers or proxies. */
export function noStore(_req: Request, res: Response, next: NextFunction): void {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  next();
}

/** Public JSON can be cached briefly by browsers; the server keeps its own in-memory cache. */
export function shortPublicCache(_req: Request, res: Response, next: NextFunction): void {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  next();
}

function safeOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function safeHost(value: string): string | null {
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}
