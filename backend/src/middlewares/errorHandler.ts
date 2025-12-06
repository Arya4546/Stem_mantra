import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors';
import logger from '../utils/logger';
import config from '../config';

interface ErrorResponse {
  success: false;
  message: string;
  code: string;
  errors?: Array<{ field: string; message: string }>;
  stack?: string;
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log the error
  logger.error(`Error: ${err.message}`, { stack: err.stack });

  // Default error response
  let statusCode = 500;
  let response: ErrorResponse = {
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
  };

  // Handle AppError instances
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    response = {
      success: false,
      message: err.message,
      code: err.code,
    };

    // Include validation errors if present
    if (err instanceof ValidationError) {
      response.errors = err.errors;
    }
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as { code?: string; meta?: { target?: string[] } };
    
    switch (prismaError.code) {
      case 'P2002':
        statusCode = 409;
        response = {
          success: false,
          message: `Unique constraint violation on ${prismaError.meta?.target?.join(', ') || 'field'}`,
          code: 'UNIQUE_CONSTRAINT_VIOLATION',
        };
        break;
      case 'P2025':
        statusCode = 404;
        response = {
          success: false,
          message: 'Record not found',
          code: 'NOT_FOUND',
        };
        break;
      default:
        statusCode = 400;
        response = {
          success: false,
          message: 'Database operation failed',
          code: 'DATABASE_ERROR',
        };
    }
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    response = {
      success: false,
      message: 'Invalid token',
      code: 'INVALID_TOKEN',
    };
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    response = {
      success: false,
      message: 'Token expired',
      code: 'TOKEN_EXPIRED',
    };
  }

  // Handle validation errors from express-validator
  if (err.name === 'ValidationError') {
    statusCode = 422;
    response = {
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
    };
  }

  // Include stack trace in development
  if (config.nodeEnv === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

// Not found handler for undefined routes
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    code: 'ROUTE_NOT_FOUND',
  });
};

// Async handler wrapper to catch async errors
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
