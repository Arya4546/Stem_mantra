import { Router } from 'express';
import { pipeline } from 'stream/promises';
import { b2, isWebsiteKey } from '../../shared/utils/b2-storage';
import { logger } from '../../config/logger';

/**
 * Public image delivery: GET /media/<key>. Streams from the (private) B2 bucket so images live on
 * our own domain (good for SEO) and can be cached by nginx and browsers forever — keys are unique.
 */
const router = Router();

router.get('/*key', async (req, res) => {
  const raw = (req.params as { key?: string[] }).key;
  const key = Array.isArray(raw) ? raw.join('/') : '';

  if (!isWebsiteKey(key)) {
    res.status(404).type('text/plain').send('Not found');
    return;
  }

  try {
    const result = await b2.get(key, req.get('if-none-match') ?? undefined);
    if (!result) {
      res.status(404).type('text/plain').send('Not found');
      return;
    }
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    if (result.notModified) {
      res.status(304).end();
      return;
    }
    res.setHeader('Content-Type', result.contentType ?? 'image/webp');
    if (result.contentLength !== undefined) res.setHeader('Content-Length', String(result.contentLength));
    if (result.etag) res.setHeader('ETag', result.etag);
    if (result.lastModified) res.setHeader('Last-Modified', result.lastModified.toUTCString());
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'");

    if (req.method === 'HEAD') {
      result.body.destroy();
      res.end();
      return;
    }
    await pipeline(result.body, res);
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === 'ERR_STREAM_PREMATURE_CLOSE') return; // client went away
    logger.error('Media delivery failed', { key, error: (err as Error).message });
    if (!res.headersSent) res.status(502).type('text/plain').send('Image temporarily unavailable');
    else res.destroy();
  }
});

export { router as mediaRoutes };
