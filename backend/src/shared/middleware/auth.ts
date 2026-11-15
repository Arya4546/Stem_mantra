import type { NextFunction, Request, Response } from 'express';
import type { Role } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { AppError } from '../errors/app-error';
import { COOKIE, verifyAccessToken } from '../utils/tokens';

/**
 * Verifies the access-token cookie and re-checks the user in the database on every request,
 * so deactivating a user or changing a password takes effect immediately.
 */
export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token: string | undefined = req.cookies?.[COOKIE.access];
    if (!token) throw AppError.unauthorized();

    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true, email: true, fullName: true, isActive: true, tokenVersion: true },
    });
    if (!user || !user.isActive || user.tokenVersion !== payload.tv) {
      throw AppError.unauthorized('Your session has expired. Please sign in again.');
    }

    req.user = { id: user.id, role: user.role, email: user.email, fullName: user.fullName };
    next();
  } catch (err) {
    next(err);
  }
}

/** SUPER_ADMIN always passes. */
export function authorize(...roles: Role[]) {
  const allowed = new Set<Role>([...roles, 'SUPER_ADMIN']);
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) return next(AppError.unauthorized());
    if (!allowed.has(req.user.role)) return next(AppError.forbidden());
    next();
  };
}
