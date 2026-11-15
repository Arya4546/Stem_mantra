import type { Request } from 'express';
import type { Tx } from '../../database/prisma';
import { prisma } from '../../database/prisma';
import { logger } from '../../config/logger';
import { clientIp } from './request-info';

export interface AuditEntry {
  action: 'create' | 'update' | 'delete' | 'reorder' | 'publish' | 'unpublish' | 'login' | 'logout' | 'password_change' | 'bulk_create' | string;
  entity: string;
  entityId?: string | null;
  summary?: string;
}

/**
 * Records who changed what. Pass the transaction client so the audit row commits (or rolls back)
 * together with the change it describes.
 */
export async function audit(req: Request, entry: AuditEntry, tx: Tx = prisma): Promise<void> {
  await tx.auditLog.create({
    data: {
      userId: req.user?.id ?? null,
      action: entry.action,
      entity: entry.entity,
      entityId: entry.entityId ?? null,
      summary: entry.summary?.slice(0, 300),
      ip: clientIp(req) ?? null,
    },
  });
  logger.info(`audit: ${entry.action} ${entry.entity}${entry.entityId ? ` ${entry.entityId}` : ''}`, {
    userId: req.user?.id,
    summary: entry.summary,
  });
}
