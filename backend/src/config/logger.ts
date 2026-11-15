import winston from 'winston';
import { env, isProd } from './env';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ timestamp: ts, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return stack ? `${ts} ${level}: ${message}\n${stack}` : `${ts} ${level}: ${message}${metaStr}`;
  }),
);

// In production logs go to stdout as JSON; Docker keeps (and rotates) them.
export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: isProd ? combine(timestamp(), errors({ stack: true }), json()) : devFormat,
  transports: [new winston.transports.Console()],
});
