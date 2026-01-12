import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import prisma from '../config/database';
import { UserRole } from '@prisma/client';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
        schoolId?: string | null;
      };
    }
  }
}

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  schoolId?: string | null;
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        schoolId: true,
        status: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedError('Account is not active');
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new UnauthorizedError('Token expired'));
    } else {
      next(error);
    }
  }
};

// Optional authentication - doesn't throw error if no token
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        schoolId: true,
        status: true,
      },
    });

    if (user && user.status === 'ACTIVE') {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
      };
    }

    next();
  } catch {
    // Ignore token errors for optional auth
    next();
  }
};

// Role-based authorization
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError('You do not have permission to access this resource');
    }

    next();
  };
};

// Check if user is admin (includes SUPER_ADMIN)
export const isAdmin = authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER);

// Check if user is school admin or above
export const isSchoolAdmin = authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER, UserRole.SCHOOL_ADMIN);

// Check if user is teacher or above
export const isTeacher = authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER, UserRole.SCHOOL_ADMIN, UserRole.TEACHER);
