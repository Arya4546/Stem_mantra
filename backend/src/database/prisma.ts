import { Prisma, PrismaClient } from '@prisma/client';
import { env } from '../config/env';
import { logger } from '../config/logger';

const logLevels: Prisma.LogDefinition[] = [
  { emit: 'event', level: 'error' },
  { emit: 'event', level: 'warn' },
  ...(env.LOG_QUERIES ? [{ emit: 'event', level: 'query' } as const] : []),
];

export const prisma = new PrismaClient({ log: logLevels });

prisma.$on('error' as never, (e: Prisma.LogEvent) => logger.error('Prisma error', { target: e.target, message: e.message }));
prisma.$on('warn' as never, (e: Prisma.LogEvent) => logger.warn('Prisma warning', { target: e.target, message: e.message }));

if (env.LOG_QUERIES) {
  const SLOW_MS = 200;
  prisma.$on('query' as never, (e: Prisma.QueryEvent) => {
    const sql = e.query.replace(/\s+/g, ' ').replace(/"public"\./g, '');
    const params = e.params.length > 300 ? `${e.params.slice(0, 300)}…` : e.params;
    const line = `🗄  ${e.duration}ms  ${sql}${params && params !== '[]' ? `  ${params}` : ''}`;
    if (e.duration >= SLOW_MS) logger.warn(`SLOW QUERY ${line}`);
    else logger.info(line);
  });
}

export type Tx = Prisma.TransactionClient;
