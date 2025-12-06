import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';
import { ProgramType, ProgramStatus } from '@prisma/client';

interface ProgramQuery {
  page?: number;
  limit?: number;
  type?: ProgramType;
  status?: ProgramStatus;
  isFeatured?: boolean;
  search?: string;
}

class ProgramService {
  async getAll(query: ProgramQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (query.type) {
      where.type = query.type;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [programs, total] = await Promise.all([
      prisma.program.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        include: {
          _count: {
            select: {
              courses: true,
              enrollments: true,
              schools: true,
            },
          },
        },
      }),
      prisma.program.count({ where }),
    ]);

    return {
      programs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getBySlug(slug: string) {
    const program = await prisma.program.findUnique({
      where: { slug },
      include: {
        courses: {
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: {
            enrollments: true,
            schools: true,
          },
        },
      },
    });

    if (!program) {
      throw new NotFoundError('Program not found');
    }

    return program;
  }

  async getById(id: string) {
    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        courses: true,
        schools: {
          include: {
            school: {
              select: {
                id: true,
                name: true,
                city: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!program) {
      throw new NotFoundError('Program not found');
    }

    return program;
  }

  async getFeatured() {
    const programs = await prisma.program.findMany({
      where: {
        isFeatured: true,
        status: ProgramStatus.ACTIVE,
      },
      take: 6,
      orderBy: { createdAt: 'desc' },
    });

    return programs;
  }

  async getByType(type: ProgramType) {
    const programs = await prisma.program.findMany({
      where: {
        type,
        status: ProgramStatus.ACTIVE,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        courses: true,
      },
    });

    return programs;
  }
}

export default new ProgramService();
