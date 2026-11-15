import type { NextFunction, Request, Response } from 'express';
import { logger } from '../../config/logger';

/** One line per API request (status, duration). Page/asset requests are not logged here. */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    // Container health checks hit /api/health every 30s; only log them when they fail.
    if (res.statusCode < 400 && req.originalUrl.startsWith('/api/health')) return;
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    const data = {
      method: req.method,
      path: req.originalUrl.split('?')[0],
      status: res.statusCode,
      durationMs: Math.round(ms * 10) / 10,
      ip: req.ip,
      userId: req.user?.id,
    };
    const line = `${data.method} ${data.path} ${data.status} ${data.durationMs}ms`;
    if (res.statusCode >= 500) logger.error(line, data);
    else if (res.statusCode >= 400) logger.warn(line, data);
    else logger.http(line, data);
  });
  next();
}
