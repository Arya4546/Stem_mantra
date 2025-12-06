import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import config from '../config';
import logger from '../utils/logger';
import { UserRole, UserStatus } from '@prisma/client';

class AdminSeeder {
  private readonly SALT_ROUNDS = 12;

  /**
   * Check if a super admin exists in the database
   */
  async superAdminExists(): Promise<boolean> {
    const count = await prisma.user.count({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });
    return count > 0;
  }

  /**
   * Check if any admin (SUPER_ADMIN or ADMIN) exists
   */
  async anyAdminExists(): Promise<boolean> {
    const count = await prisma.user.count({
      where: {
        role: {
          in: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
        },
      },
    });
    return count > 0;
  }

  /**
   * Create the default super admin user
   */
  async createDefaultAdmin(): Promise<void> {
    const hashedPassword = await bcrypt.hash(config.admin.password, this.SALT_ROUNDS);

    const admin = await prisma.user.create({
      data: {
        email: config.admin.email,
        password: hashedPassword,
        firstName: config.admin.firstName,
        lastName: config.admin.lastName,
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        emailVerified: true,
      },
    });

    logger.info(`Default super admin created: ${admin.email}`);
  }

  /**
   * Seed the admin user on server startup
   */
  async seedAdmin(): Promise<void> {
    try {
      const exists = await this.superAdminExists();

      if (!exists) {
        logger.info('No super admin found. Creating default admin...');
        await this.createDefaultAdmin();
        logger.info('Default admin created successfully.');
        logger.info(`Email: ${config.admin.email}`);
        logger.info('Please change the default password after first login!');
      } else {
        logger.debug('Super admin already exists. Skipping seed.');
      }
    } catch (error) {
      // If there's a unique constraint error, admin already exists
      if ((error as { code?: string }).code === 'P2002') {
        logger.debug('Admin user already exists (unique constraint).');
        return;
      }
      logger.error('Failed to seed admin user:', error);
      throw error;
    }
  }

  /**
   * Get admin statistics
   */
  async getAdminStats(): Promise<{
    totalAdmins: number;
    superAdmins: number;
    admins: number;
    managers: number;
  }> {
    const [superAdmins, admins, managers] = await Promise.all([
      prisma.user.count({ where: { role: UserRole.SUPER_ADMIN } }),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({ where: { role: UserRole.MANAGER } }),
    ]);

    return {
      totalAdmins: superAdmins + admins + managers,
      superAdmins,
      admins,
      managers,
    };
  }
}

export const adminSeeder = new AdminSeeder();
export default adminSeeder;
