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

  async create(data: {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    type: ProgramType;
    status?: ProgramStatus;
    icon?: string;
    coverImage?: string;
    duration: string;
    price: number;
    discountPrice?: number;
    features?: string[];
    isFeatured?: boolean;
  }) {
    // Check if slug already exists
    const existingProgram = await prisma.program.findUnique({
      where: { slug: data.slug },
    });

    if (existingProgram) {
      throw new Error('Program with this slug already exists');
    }

    const program = await prisma.program.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        type: data.type,
        status: data.status || ProgramStatus.ACTIVE,
        thumbnail: data.icon,
        duration: data.duration,
        price: data.price,
        discountPrice: data.discountPrice,
        features: data.features || [],
        isFeatured: data.isFeatured || false,
      },
    });

    return program;
  }

  async update(id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    shortDescription?: string;
    type?: ProgramType;
    status?: ProgramStatus;
    thumbnail?: string;
    duration?: string;
    price?: number;
    discountPrice?: number;
    features?: string[];
    isFeatured?: boolean;
  }) {
    const program = await prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundError('Program not found');
    }

    // Check if new slug already exists (if being changed)
    if (data.slug && data.slug !== program.slug) {
      const existingProgram = await prisma.program.findUnique({
        where: { slug: data.slug },
      });

      if (existingProgram) {
        throw new Error('Program with this slug already exists');
      }
    }

    const updatedProgram = await prisma.program.update({
      where: { id },
      data,
    });

    return updatedProgram;
  }

  async delete(id: string) {
    const program = await prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundError('Program not found');
    }

    // Check if program has enrollments
    const enrollmentCount = await prisma.enrollment.count({
      where: { programId: id },
    });

    if (enrollmentCount > 0) {
      throw new Error('Cannot delete program with active enrollments');
    }

    await prisma.program.delete({
      where: { id },
    });

    return { message: 'Program deleted successfully' };
  }
}

export default new ProgramService();
