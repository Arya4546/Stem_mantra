import type { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { Prisma } from '@prisma/client';
import { AppError, HttpStatus } from '../errors/app-error';
import { logger } from '../../config/logger';
import { env, isProd } from '../../config/env';

export function globalErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  if (res.headersSent) {
    logger.error('Error after headers were sent', { path: req.path, message: err.message });
    res.end();
    return;
  }

  if (err instanceof AppError) {
    if (err.statusCode >= 500) logger.error(err.message, { path: req.path, method: req.method });
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
      ...(err.details ? { meta: { errors: err.details } } : {}),
    });
    return;
  }

  if (err instanceof MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? `The file is too large. The maximum size is ${env.MAX_UPLOAD_MB} MB.`
        : err.code === 'LIMIT_UNEXPECTED_FILE'
          ? 'Unexpected file field. Upload one image in the "file" field.'
          : `Upload error: ${err.message}`;
    res.status(err.code === 'LIMIT_FILE_SIZE' ? HttpStatus.PAYLOAD_TOO_LARGE : HttpStatus.BAD_REQUEST).json({
      success: false,
      message,
      data: null,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const fields = (err.meta?.target as string[] | undefined)?.join(', ') ?? 'value';
      res.status(HttpStatus.CONFLICT).json({ success: false, message: `That ${fields} is already in use.`, data: null });
      return;
    }
    if (err.code === 'P2025') {
      res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Record not found', data: null });
      return;
    }
    if (err.code === 'P2003') {
      res.status(HttpStatus.CONFLICT).json({
        success: false,
        message: 'This item is still referenced by other content.',
        data: null,
      });
      return;
    }
  }

  // body-parser errors are client errors
  const type = (err as Error & { type?: string }).type;
  if (type === 'entity.too.large') {
    res.status(HttpStatus.PAYLOAD_TOO_LARGE).json({ success: false, message: 'Request is too large.', data: null });
    return;
  }
  if (type === 'entity.parse.failed') {
    res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Invalid JSON body.', data: null });
    return;
  }

  logger.error('Unhandled error', { message: err.message, stack: err.stack, path: req.path, method: req.method });
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: isProd ? 'Something went wrong. Please try again.' : err.message,
    data: null,
  });
}
