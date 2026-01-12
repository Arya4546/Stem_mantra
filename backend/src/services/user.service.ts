import prisma from '../config/database';
import { Prisma, UserRole, UserStatus } from '@prisma/client';
import { NotFoundError, BadRequestError, ConflictError } from '../utils/errors';
import bcrypt from 'bcryptjs';

interface GetUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
}

class UserService {
  async getUsers(query: GetUsersQuery) {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          status: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      items: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    };
  }

  async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    role?: UserRole;
    status?: UserStatus;
  }) {
    const { email, password, firstName, lastName, phone, role = 'USER', status = 'ACTIVE' } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role,
        status,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserData) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.role === 'SUPER_ADMIN') {
      throw new BadRequestError('Cannot delete super admin user');
    }

    await prisma.user.delete({ where: { id } });

    return { message: 'User deleted successfully' };
  }

  async toggleUserStatus(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.role === 'SUPER_ADMIN') {
      throw new BadRequestError('Cannot modify super admin status');
    }

    const newStatus = user.status === 'ACTIVE' ? UserStatus.INACTIVE : UserStatus.ACTIVE;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status: newStatus },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async changeUserRole(id: string, newRole: UserRole) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.role === 'SUPER_ADMIN') {
      throw new BadRequestError('Cannot modify super admin role');
    }

    if (newRole === 'SUPER_ADMIN') {
      throw new BadRequestError('Cannot assign super admin role');
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async getUserStats() {
    const [total, activeUsers, admins, newThisMonth] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count({ where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

    return {
      total,
      activeUsers,
      admins,
      newThisMonth,
    };
  }
}

export const userService = new UserService();
export default userService;
