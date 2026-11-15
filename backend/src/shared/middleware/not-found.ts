import type { Request, Response } from 'express';
import { HttpStatus } from '../errors/app-error';

export function apiNotFound(req: Request, res: Response): void {
  res.status(HttpStatus.NOT_FOUND).json({ success: false, message: `Route ${req.method} ${req.originalUrl.split('?')[0]} not found`, data: null });
}
