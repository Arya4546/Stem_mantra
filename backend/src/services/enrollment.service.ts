import prisma from '../config/database';
import { NotFoundError, BadRequestError } from '../utils/errors';

interface EnrollmentQuery {
  page?: number;
  limit?: number;
  status?: string;
  userId?: string;
  programId?: string;
}

class EnrollmentService {
  // Get user's enrollments
  async getMyEnrollments(userId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            type: true,
            thumbnail: true,
            duration: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return enrollments;
  }

  // Get a single enrollment
  async getEnrollmentById(id: string, userId: string) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        program: {
          include: {
            courses: true,
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundError('Enrollment not found');
    }

    // Check if the enrollment belongs to the user
    if (enrollment.userId !== userId) {
      throw new NotFoundError('Enrollment not found');
    }

    return enrollment;
  }

  // Enroll in a program
  async enrollInProgram(userId: string, programId: string) {
    // Check if program exists
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      throw new NotFoundError('Program not found');
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_programId: {
          userId,
          programId,
        },
      },
    });

    if (existingEnrollment) {
      throw new BadRequestError('You are already enrolled in this program');
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        programId,
        status: 'enrolled',
        progress: 0,
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
          },
        },
      },
    });

    return enrollment;
  }

  // Update enrollment progress
  async updateProgress(enrollmentId: string, userId: string, progress: number) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      throw new NotFoundError('Enrollment not found');
    }

    if (enrollment.userId !== userId) {
      throw new NotFoundError('Enrollment not found');
    }

    // Validate progress
    if (progress < 0 || progress > 100) {
      throw new BadRequestError('Progress must be between 0 and 100');
    }

    // Update enrollment
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        progress,
        status: progress === 100 ? 'completed' : 'enrolled',
        completedAt: progress === 100 ? new Date() : null,
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return updatedEnrollment;
  }

  // Admin: Get all enrollments
  async getAllEnrollments(query: EnrollmentQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.programId) {
      where.programId = query.programId;
    }

    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
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
              email: true,
            },
          },
          program: {
            select: {
              id: true,
              name: true,
              slug: true,
              type: true,
            },
          },
        },
      }),
      prisma.enrollment.count({ where }),
    ]);

    return {
      enrollments,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  // Get enrollment stats
  async getEnrollmentStats() {
    const [total, completed, inProgress, byProgram] = await Promise.all([
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { status: 'completed' } }),
      prisma.enrollment.count({ where: { status: 'enrolled' } }),
      prisma.enrollment.groupBy({
        by: ['programId'],
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
        take: 5,
      }),
    ]);

    return {
      total,
      completed,
      inProgress,
      topPrograms: byProgram,
    };
  }
}

export default new EnrollmentService();
