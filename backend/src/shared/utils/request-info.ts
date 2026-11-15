import type { Request } from 'express';

/** Client IP as resolved by Express (honours TRUST_PROXY). */
export function clientIp(req: Request): string | undefined {
  return req.ip?.slice(0, 64);
}

export function userAgent(req: Request): string | undefined {
  return req.get('user-agent')?.slice(0, 300);
}
