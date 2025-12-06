import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';
import { InquiryType, InquiryStatus } from '@prisma/client';

interface CreateContactInput {
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  designation?: string;
  subject?: string;
  message: string;
  type?: InquiryType;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  userId?: string;
}

interface ContactQuery {
  page?: number;
  limit?: number;
  status?: InquiryStatus;
  type?: InquiryType;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

class ContactService {
  async create(input: CreateContactInput) {
    const contact = await prisma.contactSubmission.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        schoolName: input.schoolName,
        designation: input.designation,
        subject: input.subject,
        message: input.message,
        type: input.type || InquiryType.GENERAL,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        source: input.source,
        userId: input.userId,
      },
    });

    return contact;
  }

  async getAll(query: ContactQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.type) {
      where.type = query.type;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { schoolName: { contains: query.search, mode: 'insensitive' } },
        { subject: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) {
        (where.createdAt as Record<string, unknown>).gte = query.startDate;
      }
      if (query.endDate) {
        (where.createdAt as Record<string, unknown>).lte = query.endDate;
      }
    }

    // Get contacts with pagination
    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return {
      contacts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    const contact = await prisma.contactSubmission.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!contact) {
      throw new NotFoundError('Contact submission not found');
    }

    return contact;
  }

  async updateStatus(id: string, status: InquiryStatus, respondedBy?: string, response?: string) {
    const contact = await prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundError('Contact submission not found');
    }

    const updatedContact = await prisma.contactSubmission.update({
      where: { id },
      data: {
        status,
        respondedAt: status === InquiryStatus.RESPONDED ? new Date() : undefined,
        respondedBy,
        response,
      },
    });

    return updatedContact;
  }

  async delete(id: string) {
    const contact = await prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundError('Contact submission not found');
    }

    await prisma.contactSubmission.delete({
      where: { id },
    });

    return { message: 'Contact submission deleted successfully' };
  }

  async getStats() {
    const [total, byStatus, byType, recentCount] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.contactSubmission.groupBy({
        by: ['status'],
        _count: true,
      }),
      prisma.contactSubmission.groupBy({
        by: ['type'],
        _count: true,
      }),
      prisma.contactSubmission.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      }),
    ]);

    return {
      total,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = item._count;
        return acc;
      }, {} as Record<string, number>),
      byType: byType.reduce((acc, item) => {
        acc[item.type] = item._count;
        return acc;
      }, {} as Record<string, number>),
      recentCount,
    };
  }
}

export default new ContactService();
