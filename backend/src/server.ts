import { shutdownTelemetry } from './instrumentation'; // must stay the first import
import { createServer } from 'http';
import { env } from './config/env';
import { logger } from './config/logger';
import { prisma } from './database/prisma';
import { seedSuperAdmin } from './database/seed';
import { seedInitialContent } from './database/seed-content';
import { createApp } from './app';
import { createNextIntegration, type NextIntegration } from './next-app';
import { purgeExpiredRefreshTokens } from './modules/auth/auth.service';
import { cleanupOrphanMedia } from './modules/media/media.service';

async function connectWithRetry(retries = 10): Promise<void> {
  for (let attempt = 1; ; attempt++) {
    try {
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      logger.info('✔ Database connected');
      return;
    } catch (err) {
      if (attempt >= retries) throw err;
      logger.warn(`Database not reachable (attempt ${attempt}/${retries}). Retrying in 3s…`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

function every(ms: number, name: string, job: () => Promise<unknown>): NodeJS.Timeout {
  const timer = setInterval(() => {
    job().catch((err) => logger.error(`Background job "${name}" failed`, { error: (err as Error).message }));
  }, ms);
  timer.unref();
  return timer;
}

async function bootstrap(): Promise<void> {
  await connectWithRetry();
  await seedSuperAdmin();
  await seedInitialContent();

  let next: NextIntegration | undefined;
  if (env.SERVE_FRONTEND) {
    const started = Date.now();
    next = await createNextIntegration();
    logger.info(`✔ Next.js ready (${env.NODE_ENV}) in ${Date.now() - started}ms`);
  }

  const app = createApp(next);
  const server = createServer(app);
  server.keepAliveTimeout = 65_000; // longer than nginx's upstream keepalive
  server.headersTimeout = 66_000;
  if (next?.upgrade) {
    server.on('upgrade', (req, socket, head) => {
      void next!.upgrade!(req, socket, head);
    });
  }

  server.listen(env.PORT, () => {
    logger.info(`🚀 STEMmantra site listening on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
  });

  const timers = [
    every(60 * 60 * 1000, 'purge refresh tokens', purgeExpiredRefreshTokens),
    every(6 * 60 * 60 * 1000, 'orphan media cleanup', cleanupOrphanMedia),
  ];

  let shuttingDown = false;
  const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info(`${signal} received — shutting down gracefully`);
    timers.forEach(clearInterval);
    const force = setTimeout(() => process.exit(1), 15_000);
    force.unref();
    server.close();
    server.closeIdleConnections();
    await next?.close().catch(() => undefined);
    await prisma.$disconnect().catch(() => undefined);
    await shutdownTelemetry();
    process.exit(0);
  };
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection', { reason: reason instanceof Error ? reason.stack : String(reason) });
});
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception — exiting', { error: error.stack });
  setTimeout(() => process.exit(1), 500);
});

bootstrap().catch(async (err) => {
  logger.error('Failed to start server', { error: (err as Error).stack });
  await prisma.$disconnect().catch(() => undefined);
  await shutdownTelemetry();
  process.exit(1);
});
