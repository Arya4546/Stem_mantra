import { Request, Response, NextFunction } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Async handler wrapper to catch errors in async route handlers
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
  meta?: ApiResponse['meta']
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message = 'Resource created successfully'
): Response => {
  return sendSuccess(res, data, message, 201);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400,
  error?: string,
  errors?: Array<{ field: string; message: string }>
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
  };

  if (error) {
    response.error = error;
  }

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

export const sendNotFound = (
  res: Response,
  message = 'Resource not found'
): Response => {
  return sendError(res, message, 404);
};

export const sendUnauthorized = (
  res: Response,
  message = 'Unauthorized access'
): Response => {
  return sendError(res, message, 401);
};

export const sendForbidden = (
  res: Response,
  message = 'Access forbidden'
): Response => {
  return sendError(res, message, 403);
};

export const sendServerError = (
  res: Response,
  message = 'Internal server error',
  error?: string
): Response => {
  return sendError(res, message, 500, error);
};

export const sendValidationError = (
  res: Response,
  errors: Array<{ field: string; message: string }>,
  message = 'Validation failed'
): Response => {
  return sendError(res, message, 422, undefined, errors);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number,
  message = 'Success'
): Response => {
  const totalPages = Math.ceil(total / limit);
  return sendSuccess(res, data, message, 200, {
    page,
    limit,
    total,
    totalPages,
  });
};