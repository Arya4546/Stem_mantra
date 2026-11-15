import type { Request } from 'express';
import type { Enquiry, Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { env } from '../../config/env';
import { logger } from '../../config/logger';
import { AppError } from '../../shared/errors/app-error';
import { audit } from '../../shared/utils/audit';
import { sendMail } from '../../shared/utils/mailer';
import { clientIp, userAgent } from '../../shared/utils/request-info';
import { paginationMeta } from '../../shared/utils/response';
import { renderEnquiryEmail } from './enquiry-email';
import type { EnquiryListQuery, EnquirySubmitInput } from './enquiries.validators';

/**
 * Saves the enquiry first (so it is never lost), then notifies the team by email in the
 * background. The visitor gets an instant response either way.
 */
export async function submitEnquiry(req: Request, input: EnquirySubmitInput): Promise<void> {
  if (input.hp_trap) {
    logger.warn('Enquiry honeypot triggered — dropped', { ip: clientIp(req) });
    return;
  }

  const enquiry = await prisma.enquiry.create({
    data: {
      type: input.type === 'demo' ? 'DEMO' : 'CONTACT',
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      organization: input.school ?? null,
      interest: input.interest ?? null,
      message: input.message || null,
      sourcePath: input.sourcePath || null,
      ip: clientIp(req) ?? null,
      userAgent: userAgent(req) ?? null,
    },
  });

  void notifyTeam(enquiry);
}

async function notifyTeam(enquiry: Enquiry): Promise<'SENT' | 'FAILED' | 'SKIPPED'> {
  const { subject, html, text } = renderEnquiryEmail(enquiry);
  const result = await sendMail({
    to: env.ENQUIRY_RECIPIENTS,
    subject,
    html,
    text,
    replyTo: { name: enquiry.name, address: enquiry.email },
  });
  await prisma.enquiry
    .update({ where: { id: enquiry.id }, data: { emailStatus: result } })
    .catch((err) => logger.error('Could not record enquiry email status', { id: enquiry.id, error: (err as Error).message }));
  return result;
}

export async function listEnquiries(query: EnquiryListQuery) {
  const where: Prisma.EnquiryWhereInput = {
    ...(query.status !== 'all' ? { status: query.status } : { status: { not: 'ARCHIVED' } }),
    ...(query.type !== 'all' ? { type: query.type } : {}),
    ...(query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' } },
            { email: { contains: query.q, mode: 'insensitive' } },
            { organization: { contains: query.q, mode: 'insensitive' } },
            { phone: { contains: query.q } },
          ],
        }
      : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      omit: { ip: true, userAgent: true },
    }),
    prisma.enquiry.count({ where }),
  ]);
  return { items, pagination: paginationMeta(query.page, query.limit, total) };
}

export async function getEnquiry(id: string) {
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  if (!enquiry) throw AppError.notFound('Enquiry');
  return enquiry;
}

export async function setStatus(req: Request, id: string, status: 'NEW' | 'READ' | 'ARCHIVED') {
  return prisma.$transaction(async (tx) => {
    const updated = await tx.enquiry.update({ where: { id }, data: { status } });
    await audit(req, { action: 'update', entity: 'enquiry', entityId: id, summary: `status → ${status}` }, tx);
    return updated;
  });
}

export async function bulkAction(req: Request, ids: string[], action: 'read' | 'unread' | 'archive' | 'delete') {
  return prisma.$transaction(async (tx) => {
    const { count } =
      action === 'delete'
        ? await tx.enquiry.deleteMany({ where: { id: { in: ids } } })
        : await tx.enquiry.updateMany({
            where: { id: { in: ids } },
            data: { status: action === 'read' ? 'READ' : action === 'unread' ? 'NEW' : 'ARCHIVED' },
          });
    await audit(req, { action: `bulk_${action}`, entity: 'enquiry', summary: `${count} enquiries` }, tx);
    return count;
  });
}

export async function deleteEnquiry(req: Request, id: string) {
  await prisma.$transaction(async (tx) => {
    const current = await tx.enquiry.findUnique({ where: { id } });
    if (!current) throw AppError.notFound('Enquiry');
    await tx.enquiry.delete({ where: { id } });
    await audit(req, { action: 'delete', entity: 'enquiry', entityId: id, summary: current.email }, tx);
  });
}

export async function resendEmail(id: string) {
  const enquiry = await getEnquiry(id);
  const result = await notifyTeam(enquiry);
  if (result === 'FAILED') throw new AppError('The email could not be sent. Please try again later.', 502);
  if (result === 'SKIPPED') throw new AppError('Email is not configured on the server (SMTP).', 503);
}
