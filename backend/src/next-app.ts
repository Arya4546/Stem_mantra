import path from 'path';
import { createRequire } from 'module';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Duplex } from 'stream';
import { env, isProd } from './config/env';

/** The bits of the Next.js server API we use (types come from the frontend's own `next` package). */
interface NextServerLike {
  prepare(): Promise<void>;
  getRequestHandler(): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
  getUpgradeHandler?(): (req: IncomingMessage, socket: Duplex, head: Buffer) => Promise<void>;
  close(): Promise<void>;
}

export interface NextIntegration {
  handle: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
  upgrade?: (req: IncomingMessage, socket: Duplex, head: Buffer) => Promise<void>;
  close: () => Promise<void>;
}

/**
 * Loads Next.js from the frontend's node_modules (so the exact version the site was built with is
 * used) and returns its request handler. In development this runs `next dev` with hot reload.
 */
export async function createNextIntegration(): Promise<NextIntegration> {
  const requireFromFrontend = createRequire(path.join(env.FRONTEND_DIR, 'package.json'));
  const createNext = requireFromFrontend('next') as (options: Record<string, unknown>) => NextServerLike;

  const app = createNext({
    dev: !isProd,
    dir: env.FRONTEND_DIR,
    hostname: 'localhost',
    port: env.PORT,
    customServer: true,
  });
  await app.prepare();

  return {
    handle: app.getRequestHandler(),
    upgrade: app.getUpgradeHandler?.(),
    close: () => app.close(),
  };
}
