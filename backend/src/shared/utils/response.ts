import type { Response } from 'express';
import type { ApiResponse, PaginationMeta } from '../types/api-response';
import { HttpStatus } from '../errors/app-error';

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'OK',
  statusCode: HttpStatus = HttpStatus.OK,
  meta?: Record<string, unknown>,
): void {
  const body: ApiResponse<T> = { success: true, message, data };
  if (meta) body.meta = meta;
  res.status(statusCode).json(body);
}

export function sendPaginated<T>(res: Response, data: T, pagination: PaginationMeta, message = 'OK'): void {
  sendSuccess(res, data, message, HttpStatus.OK, { pagination });
}

export function paginationMeta(page: number, limit: number, total: number): PaginationMeta {
  return { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}
