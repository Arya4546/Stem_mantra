import { prisma } from './prisma';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { hashPassword } from '../shared/utils/hash';

/**
 * Creates the default SUPER_ADMIN from ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_FULL_NAME on first start
 * (same behaviour and credentials as the LMS). Existing users are never modified.
 */
export async function seedSuperAdmin(): Promise<void> {
  const existing = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' }, select: { email: true } });
  if (existing) {
    logger.info(`✔ Super admin present (${existing.email})`);
    return;
  }

  const email = env.ADMIN_EMAIL.trim().toLowerCase();
  const byEmail = await prisma.user.findUnique({ where: { email } });
  if (byEmail) {
    await prisma.user.update({ where: { id: byEmail.id }, data: { role: 'SUPER_ADMIN', isActive: true } });
    logger.info(`✔ Promoted ${email} to super admin`);
    return;
  }

  await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(env.ADMIN_PASSWORD),
      fullName: env.ADMIN_FULL_NAME,
      role: 'SUPER_ADMIN',
    },
  });
  logger.info(`✔ Super admin created: ${email}`);
}
