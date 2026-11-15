import crypto from 'crypto';
import type { Role } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { logger } from '../../config/logger';
import { AppError, HttpStatus } from '../../shared/errors/app-error';
import { comparePassword, DUMMY_PASSWORD_HASH, hashPassword, randomToken, sha256 } from '../../shared/utils/hash';
import { refreshExpiryDate, signAccessToken } from '../../shared/utils/tokens';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface IssuedSession {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
}

interface ClientMeta {
  ip?: string;
  userAgent?: string;
}

export async function login(email: string, password: string, meta: ClientMeta): Promise<IssuedSession> {
  const user = await prisma.user.findUnique({ where: { email } });

  // Always run bcrypt so response time doesn't reveal whether the email exists.
  const passwordOk = await comparePassword(password, user?.passwordHash ?? DUMMY_PASSWORD_HASH);

  if (!user || !user.isActive) {
    throw AppError.unauthorized('Invalid email or password');
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const minutes = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
    throw new AppError(
      `Too many failed attempts. This account is locked for ${minutes} more minute${minutes === 1 ? '' : 's'}.`,
      HttpStatus.LOCKED,
    );
  }

  if (!passwordOk) {
    const attempts = user.failedLoginAttempts + 1;
    const lock = attempts >= MAX_FAILED_ATTEMPTS;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: lock ? 0 : attempts,
        lockedUntil: lock ? new Date(Date.now() + LOCK_MINUTES * 60_000) : null,
      },
    });
    if (lock) logger.warn(`Account locked after ${MAX_FAILED_ATTEMPTS} failed logins`, { userId: user.id, ip: meta.ip });
    throw AppError.unauthorized('Invalid email or password');
  }

  const session = await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
    });
    const refreshToken = randomToken();
    await tx.refreshToken.create({
      data: {
        tokenHash: sha256(refreshToken),
        familyId: crypto.randomUUID(),
        userId: user.id,
        expiresAt: refreshExpiryDate(),
        ip: meta.ip,
        userAgent: meta.userAgent,
      },
    });
    await tx.auditLog.create({
      data: { userId: user.id, action: 'login', entity: 'user', entityId: user.id, ip: meta.ip },
    });
    return {
      accessToken: signAccessToken({ sub: user.id, role: user.role, tv: user.tokenVersion }),
      refreshToken,
    };
  });

  return { ...session, user: toSessionUser(user) };
}

/**
 * Rotates the refresh token. Presenting an already-rotated token means it was copied:
 * the whole token family is revoked and the user has to sign in again.
 */
export async function refresh(rawToken: string | undefined, meta: ClientMeta): Promise<IssuedSession> {
  if (!rawToken) throw AppError.unauthorized();
  const expired = () => AppError.unauthorized('Your session has expired. Please sign in again.');

  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash: sha256(rawToken) },
    include: { user: true },
  });
  if (!stored) throw expired();

  if (stored.revokedAt) {
    // Committed on its own (outside any transaction) so the revocation sticks.
    await prisma.refreshToken.updateMany({
      where: { familyId: stored.familyId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    logger.warn('Refresh token re-use detected — token family revoked', { userId: stored.userId, ip: meta.ip });
    throw expired();
  }
  if (stored.expiresAt < new Date() || !stored.user.isActive) throw expired();

  const next = randomToken();
  const rotated = await prisma.$transaction(async (tx) => {
    // Conditional revoke: if two refreshes race with the same token, only one wins.
    const { count } = await tx.refreshToken.updateMany({
      where: { id: stored.id, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    if (count !== 1) return false;
    const created = await tx.refreshToken.create({
      data: {
        tokenHash: sha256(next),
        familyId: stored.familyId,
        userId: stored.userId,
        expiresAt: refreshExpiryDate(),
        ip: meta.ip,
        userAgent: meta.userAgent,
      },
    });
    await tx.refreshToken.update({ where: { id: stored.id }, data: { replacedBy: created.id } });
    return true;
  });
  if (!rotated) throw expired();

  return {
    accessToken: signAccessToken({ sub: stored.user.id, role: stored.user.role, tv: stored.user.tokenVersion }),
    refreshToken: next,
    user: toSessionUser(stored.user),
  };
}

export async function logout(rawToken: string | undefined, userId?: string): Promise<void> {
  if (!rawToken) return;
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash: sha256(rawToken) } });
  if (!stored) return;
  await prisma.$transaction([
    prisma.refreshToken.updateMany({ where: { familyId: stored.familyId, revokedAt: null }, data: { revokedAt: new Date() } }),
    prisma.auditLog.create({ data: { userId: userId ?? stored.userId, action: 'logout', entity: 'user', entityId: stored.userId } }),
  ]);
}

export async function getMe(userId: string): Promise<SessionUser> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.isActive) throw AppError.unauthorized();
  return toSessionUser(user);
}

/** Changing the password signs the user out everywhere else and issues a fresh session here. */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
  meta: ClientMeta,
): Promise<IssuedSession> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.isActive) throw AppError.unauthorized();

  if (!(await comparePassword(currentPassword, user.passwordHash))) {
    throw AppError.unprocessable('Your current password is incorrect', { currentPassword: 'Incorrect password' });
  }

  const passwordHash = await hashPassword(newPassword);

  return prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: user.id },
      data: { passwordHash, passwordChangedAt: new Date(), tokenVersion: { increment: 1 } },
    });
    await tx.refreshToken.updateMany({ where: { userId: user.id, revokedAt: null }, data: { revokedAt: new Date() } });
    const refreshToken = randomToken();
    await tx.refreshToken.create({
      data: {
        tokenHash: sha256(refreshToken),
        familyId: crypto.randomUUID(),
        userId: user.id,
        expiresAt: refreshExpiryDate(),
        ip: meta.ip,
        userAgent: meta.userAgent,
      },
    });
    await tx.auditLog.create({
      data: { userId: user.id, action: 'password_change', entity: 'user', entityId: user.id, ip: meta.ip },
    });
    return {
      accessToken: signAccessToken({ sub: updated.id, role: updated.role, tv: updated.tokenVersion }),
      refreshToken,
      user: toSessionUser(updated),
    };
  });
}

/** Housekeeping: drop refresh tokens that expired more than a day ago. */
export async function purgeExpiredRefreshTokens(): Promise<number> {
  const { count } = await prisma.refreshToken.deleteMany({
    where: { expiresAt: { lt: new Date(Date.now() - 24 * 3600 * 1000) } },
  });
  return count;
}

function toSessionUser(user: { id: string; email: string; fullName: string; role: Role }): SessionUser {
  return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
}
