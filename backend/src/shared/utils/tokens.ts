import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import type { Role } from '@prisma/client';
import { env, isProd } from '../../config/env';
import { AppError } from '../errors/app-error';

const ISSUER = 'stemmantra-site';
const AUDIENCE = 'stemmantra-admin';

export const COOKIE = {
  access: 'sm_at',
  refresh: 'sm_rt',
  /** Non-secret marker read by the Next.js middleware to decide whether /admin should redirect to /login. */
  session: 'sm_session',
} as const;

export interface AccessTokenPayload {
  sub: string;
  role: Role;
  /** token version — must match users.token_version */
  tv: number;
}

export function durationToSeconds(duration: string): number {
  const match = /^(\d+)([smhd])$/.exec(duration);
  if (!match) throw new Error(`Invalid duration: ${duration}`);
  const n = Number(match[1]);
  return n * { s: 1, m: 60, h: 3600, d: 86400 }[match[2] as 's' | 'm' | 'h' | 'd'];
}

const ACCESS_TTL_S = durationToSeconds(env.JWT_ACCESS_EXPIRY);
const REFRESH_TTL_S = env.JWT_REFRESH_EXPIRY_DAYS * 86400;

export function refreshExpiryDate(): Date {
  return new Date(Date.now() + REFRESH_TTL_S * 1000);
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign({ role: payload.role, tv: payload.tv }, env.JWT_ACCESS_SECRET, {
    subject: payload.sub,
    expiresIn: ACCESS_TTL_S,
    issuer: ISSUER,
    audience: AUDIENCE,
    algorithm: 'HS256',
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ['HS256'],
    }) as jwt.JwtPayload;
    if (typeof decoded.sub !== 'string' || typeof decoded.tv !== 'number') throw new Error('bad payload');
    return { sub: decoded.sub, role: decoded.role as Role, tv: decoded.tv };
  } catch {
    throw AppError.unauthorized('Your session has expired. Please sign in again.');
  }
}

const baseCookie = { httpOnly: true, secure: isProd } as const;

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  res.cookie(COOKIE.access, accessToken, { ...baseCookie, sameSite: 'lax', path: '/api', maxAge: ACCESS_TTL_S * 1000 });
  res.cookie(COOKIE.refresh, refreshToken, {
    ...baseCookie,
    sameSite: 'strict',
    path: '/api/auth',
    maxAge: REFRESH_TTL_S * 1000,
  });
  res.cookie(COOKIE.session, '1', { ...baseCookie, sameSite: 'lax', path: '/', maxAge: REFRESH_TTL_S * 1000 });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie(COOKIE.access, { ...baseCookie, sameSite: 'lax', path: '/api' });
  res.clearCookie(COOKIE.refresh, { ...baseCookie, sameSite: 'strict', path: '/api/auth' });
  res.clearCookie(COOKIE.session, { ...baseCookie, sameSite: 'lax', path: '/' });
}
