import { Router } from 'express';
import { prisma } from '../../database/prisma';
import { asyncHandler } from '../../shared/utils/async-handler';
import { sendSuccess } from '../../shared/utils/response';

export const dashboardRouter = Router();

dashboardRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000);
    const [
      photos,
      galleryTypes,
      clients,
      testimonials,
      posts,
      drafts,
      newEnquiries,
      enquiriesThisWeek,
      failedEmails,
      recentEnquiries,
      recentActivity,
    ] = await prisma.$transaction([
      prisma.galleryImage.count(),
      prisma.galleryCategory.count(),
      prisma.client.count(),
      prisma.testimonial.count(),
      prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
      prisma.blogPost.count({ where: { status: 'DRAFT' } }),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.enquiry.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.enquiry.count({ where: { emailStatus: 'FAILED' } }),
      prisma.enquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: { id: true, type: true, name: true, organization: true, status: true, createdAt: true },
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: { id: true, action: true, entity: true, summary: true, createdAt: true, user: { select: { fullName: true } } },
      }),
    ]);

    sendSuccess(res, {
      counts: { photos, galleryTypes, clients, testimonials, posts, drafts, newEnquiries, enquiriesThisWeek, failedEmails },
      recentEnquiries,
      recentActivity,
    });
  }),
);

/** Lightweight badge counts for the admin sidebar. */
dashboardRouter.get(
  '/badges',
  asyncHandler(async (_req, res) => {
    const newEnquiries = await prisma.enquiry.count({ where: { status: 'NEW' } });
    sendSuccess(res, { newEnquiries });
  }),
);
