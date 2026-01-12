import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { asyncHandler, sendSuccess } from '../utils/response';
import { BadRequestError } from '../utils/errors';
import { UserRole, UserStatus } from '@prisma/client';

export const createUser = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password, firstName, lastName, phone, role, status } = req.body;

  if (!email || !password || !firstName) {
    throw new BadRequestError('Email, password, and first name are required');
  }

  const user = await userService.createUser({
    email,
    password,
    firstName,
    lastName,
    phone,
    role: role as UserRole,
    status: status as UserStatus,
  });

  sendSuccess(res, user, 'User created successfully', 201);
});

export const getUsers = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const {
    page = '1',
    limit = '10',
    search,
    role,
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query;

  const result = await userService.getUsers({
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    search: search as string,
    role: role as UserRole,
    status: status as UserStatus,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  });

  sendSuccess(res, result, 'Users fetched successfully');
});

export const getUserById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  sendSuccess(res, user, 'User fetched successfully');
});

export const updateUser = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { firstName, lastName, phone, role, status } = req.body;

  const user = await userService.updateUser(id, {
    firstName,
    lastName,
    phone,
    role,
    status,
  });

  sendSuccess(res, user, 'User updated successfully');
});

export const deleteUser = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;

  const result = await userService.deleteUser(id);

  sendSuccess(res, result, 'User deleted successfully');
});

export const toggleUserStatus = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;

  const user = await userService.toggleUserStatus(id);

  sendSuccess(res, user, `User ${user.status === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`);
});

export const changeUserRole = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role || !['USER', 'ADMIN'].includes(role)) {
    throw new BadRequestError('Invalid role. Must be USER or ADMIN');
  }

  const user = await userService.changeUserRole(id, role as UserRole);

  sendSuccess(res, user, 'User role updated successfully');
});

export const getUserStats = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await userService.getUserStats();

  sendSuccess(res, stats, 'User statistics fetched successfully');
});
