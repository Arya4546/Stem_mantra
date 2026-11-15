import express, { Router, type Request, type Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { prisma } from './database/prisma';
import { globalLimiter } from './config/rate-limit';
import { globalErrorHandler } from './shared/middleware/error-handler';
import { apiNotFound } from './shared/middleware/not-found';
import { requestLogger } from './shared/middleware/request-logger';
import { noStore, sameOriginOnly, shortPublicCache } from './shared/middleware/security';
import { authenticate, authorize } from './shared/middleware/auth';
import { env } from './config/env';
import type { NextIntegration } from './next-app';

import { authRoutes } from './modules/auth/auth.routes';
import { mediaRoutes } from './modules/media/media.routes';
import { uploadRoutes } from './modules/uploads/uploads.routes';
import { galleryAdminRouter, galleryPublicRouter } from './modules/gallery/gallery.routes';
import { clientsAdminRouter, clientsPublicRouter } from './modules/clients/clients.routes';
import { testimonialsAdminRouter, testimonialsPublicRouter } from './modules/testimonials/testimonials.routes';
import { blogAdminRouter, blogPublicRouter } from './modules/blog/blog.routes';
import { enquiriesAdminRouter, enquiriesPublicRouter } from './modules/enquiries/enquiries.routes';
import { dashboardRouter } from './modules/dashboard/dashboard.routes';

export function createApp(next?: NextIntegration): express.Application {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', env.TRUST_PROXY);

  app.use(
    helmet({
      // Next.js injects inline scripts; a nonce-based CSP would disable static optimisation.
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      frameguard: { action: 'sameorigin' },
      // HSTS is set by nginx in production (and must not be sent on http://localhost).
      strictTransportSecurity: false,
    }),
  );
  app.use(compression({ threshold: 1024 }));
  app.use(cookieParser());

  // ── Images uploaded by admins (streamed from Backblaze) ───────────────
  app.use('/media', mediaRoutes);

  // ── REST API ───────────────────────────────────────────────────────────
  const api = Router();
  api.use((_req, res, nextFn) => {
    res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
    nextFn();
  });
  api.use(requestLogger);
  api.use(globalLimiter);
  api.use(express.json({ limit: '1mb' }));
  api.use(sameOriginOnly);

  api.get('/health', async (_req: Request, res: Response) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.setHeader('Cache-Control', 'no-store');
      res.json({ success: true, message: 'ok', data: { uptime: Math.round(process.uptime()) } });
    } catch {
      res.status(503).json({ success: false, message: 'database unavailable', data: null });
    }
  });

  api.use('/auth', noStore, authRoutes);

  // Public, read-mostly content (also used by the server-rendered pages)
  api.use('/public/gallery', shortPublicCache, galleryPublicRouter);
  api.use('/public/clients', shortPublicCache, clientsPublicRouter);
  api.use('/public/testimonials', shortPublicCache, testimonialsPublicRouter);
  api.use('/public/blog', shortPublicCache, blogPublicRouter);
  api.use('/public/enquiries', noStore, enquiriesPublicRouter);

  // Admin (every route requires a signed-in user)
  const admin = Router();
  admin.use(noStore, authenticate);
  admin.use('/dashboard', dashboardRouter);
  admin.use('/uploads', uploadRoutes);
  admin.use('/gallery', galleryAdminRouter);
  admin.use('/clients', clientsAdminRouter);
  admin.use('/testimonials', testimonialsAdminRouter);
  admin.use('/blog', blogAdminRouter);
  admin.use('/enquiries', authorize('ADMIN'), enquiriesAdminRouter);
  api.use('/admin', admin);

  api.use(apiNotFound);
  api.use(globalErrorHandler);
  app.use('/api', api);

  // ── Everything else is the Next.js website ─────────────────────────────
  if (next) {
    app.use((req, res) => {
      void next.handle(req, res);
    });
  } else {
    app.use((_req, res) => {
      res.status(404).type('text/plain').send('Frontend is disabled (SERVE_FRONTEND=false)');
    });
  }

  return app;
}
