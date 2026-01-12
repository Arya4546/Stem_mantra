import prisma from '../config/database';

// ==========================================
// Types
// ==========================================

type AchievementCategoryType = 'LEARNING' | 'COMPLETION' | 'STREAK' | 'SPECIAL';

interface CreateAchievementDefinitionInput {
  title: string;
  description: string;
  icon?: string;
  category?: AchievementCategoryType;
  points?: number;
  maxProgress?: number;
  sortOrder?: number;
}

interface UpdateAchievementDefinitionInput {
  title?: string;
  description?: string;
  icon?: string;
  category?: AchievementCategoryType;
  points?: number;
  maxProgress?: number | null;
  isActive?: boolean;
  sortOrder?: number;
}

export const achievementService = {
  // ============ Achievement Definitions ============

  async getAllDefinitions(includeInactive = false) {
    return prisma.achievementDefinition.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
  },

  async getDefinitionById(id: string) {
    return prisma.achievementDefinition.findUnique({
      where: { id },
    });
  },

  async createDefinition(data: CreateAchievementDefinitionInput) {
    return prisma.achievementDefinition.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon || 'award',
        category: data.category || 'LEARNING',
        points: data.points || 100,
        maxProgress: data.maxProgress,
        sortOrder: data.sortOrder || 0,
      },
    });
  },

  async updateDefinition(id: string, data: UpdateAchievementDefinitionInput) {
    return prisma.achievementDefinition.update({
      where: { id },
      data,
    });
  },

  async deleteDefinition(id: string) {
    return prisma.achievementDefinition.delete({
      where: { id },
    });
  },

  // ============ User Achievements ============

  async getUserAchievements(userId: string) {
    // Get all achievement definitions
    const definitions = await prisma.achievementDefinition.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { category: 'asc' }],
    });

    // Get user's progress
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    });

    const userAchievementMap = new Map(
      userAchievements.map((ua: { achievementId: string; progress: number; isCompleted: boolean; earnedAt: Date | null }) => [ua.achievementId, ua])
    );

    // Combine definitions with user progress
    return definitions.map((def: { id: string; title: string; description: string; icon: string; category: string; points: number; maxProgress: number | null }) => {
      const userAchievement = userAchievementMap.get(def.id) as { progress: number; isCompleted: boolean; earnedAt: Date | null } | undefined;
      return {
        id: def.id,
        title: def.title,
        description: def.description,
        icon: def.icon,
        category: def.category.toLowerCase(),
        points: def.points,
        maxProgress: def.maxProgress,
        progress: userAchievement?.progress || 0,
        isLocked: !userAchievement?.isCompleted,
        earnedAt: userAchievement?.earnedAt?.toISOString(),
      };
    });
  },

  async getUserAchievementStats(userId: string) {
    const [total, earned, userAchievements] = await Promise.all([
      prisma.achievementDefinition.count({ where: { isActive: true } }),
      prisma.userAchievement.count({
        where: { userId, isCompleted: true },
      }),
      prisma.userAchievement.findMany({
        where: { userId, isCompleted: true },
        include: { achievement: true },
      }),
    ]);

    const totalPoints = userAchievements.reduce(
      (sum: number, a: { achievement: { points: number } }) => sum + a.achievement.points, 
      0
    );

    return { total, earned, points: totalPoints };
  },

  async updateUserProgress(
    userId: string,
    achievementId: string,
    progress: number
  ) {
    const definition = await prisma.achievementDefinition.findUnique({
      where: { id: achievementId },
    });

    if (!definition) {
      throw new Error('Achievement not found');
    }

    const isCompleted = definition.maxProgress
      ? progress >= definition.maxProgress
      : progress > 0;

    return prisma.userAchievement.upsert({
      where: {
        userId_achievementId: { userId, achievementId },
      },
      update: {
        progress,
        isCompleted,
        earnedAt: isCompleted ? new Date() : null,
      },
      create: {
        userId,
        achievementId,
        progress,
        isCompleted,
        earnedAt: isCompleted ? new Date() : null,
      },
    });
  },

  async awardAchievement(userId: string, achievementId: string) {
    const definition = await prisma.achievementDefinition.findUnique({
      where: { id: achievementId },
    });

    if (!definition) {
      throw new Error('Achievement not found');
    }

    return prisma.userAchievement.upsert({
      where: {
        userId_achievementId: { userId, achievementId },
      },
      update: {
        isCompleted: true,
        progress: definition.maxProgress || 1,
        earnedAt: new Date(),
      },
      create: {
        userId,
        achievementId,
        isCompleted: true,
        progress: definition.maxProgress || 1,
        earnedAt: new Date(),
      },
    });
  },

  // ============ Certificates ============

  async getUserCertificates(userId: string) {
    return prisma.certificate.findMany({
      where: { userId },
      include: {
        enrollment: {
          include: {
            program: true,
          },
        },
      },
      orderBy: { issuedAt: 'desc' },
    });
  },

  async getCertificateById(id: string) {
    return prisma.certificate.findUnique({
      where: { id },
      include: {
        enrollment: {
          include: {
            program: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
  },

  async getCertificateByNumber(certificateNumber: string) {
    return prisma.certificate.findUnique({
      where: { certificateNumber },
      include: {
        enrollment: {
          include: {
            program: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  },

  async issueCertificate(enrollmentId: string, title?: string) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        user: true,
        program: true,
      },
    });

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    // Check if certificate already exists
    const existingCert = await prisma.certificate.findUnique({
      where: { enrollmentId },
    });

    if (existingCert) {
      throw new Error('Certificate already issued for this enrollment');
    }

    // Generate certificate number
    const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    return prisma.certificate.create({
      data: {
        userId: enrollment.userId,
        enrollmentId,
        title: title || 'Certificate of Completion',
        courseName: enrollment.program.name,
        certificateNumber,
      },
      include: {
        enrollment: {
          include: {
            program: true,
          },
        },
      },
    });
  },

  async deleteCertificate(id: string) {
    return prisma.certificate.delete({
      where: { id },
    });
  },

  // ============ Helper: Initialize Default Achievements ============

  async seedDefaultAchievements() {
    const defaultAchievements = [
      {
        title: 'First Steps',
        description: 'Complete your first course lesson',
        icon: 'star',
        category: 'LEARNING' as const,
        points: 50,
      },
      {
        title: 'Quick Learner',
        description: 'Complete 5 lessons in one day',
        icon: 'zap',
        category: 'LEARNING' as const,
        points: 100,
        maxProgress: 5,
      },
      {
        title: 'Course Champion',
        description: 'Complete your first course',
        icon: 'trophy',
        category: 'COMPLETION' as const,
        points: 200,
      },
      {
        title: 'Dedication',
        description: 'Maintain a 7-day learning streak',
        icon: 'clock',
        category: 'STREAK' as const,
        points: 150,
        maxProgress: 7,
      },
      {
        title: 'Perfect Score',
        description: 'Score 100% in any quiz',
        icon: 'target',
        category: 'LEARNING' as const,
        points: 100,
      },
      {
        title: 'Robotics Master',
        description: 'Complete all robotics courses',
        icon: 'medal',
        category: 'SPECIAL' as const,
        points: 500,
        maxProgress: 5,
      },
      {
        title: 'Knowledge Seeker',
        description: 'Enroll in 3 different programs',
        icon: 'book',
        category: 'LEARNING' as const,
        points: 100,
        maxProgress: 3,
      },
      {
        title: 'Consistent Learner',
        description: 'Maintain a 30-day learning streak',
        icon: 'clock',
        category: 'STREAK' as const,
        points: 300,
        maxProgress: 30,
      },
    ];

    for (const achievement of defaultAchievements) {
      await prisma.achievementDefinition.upsert({
        where: { 
          id: `default-${achievement.title.toLowerCase().replace(/\s+/g, '-')}` 
        },
        update: achievement,
        create: {
          id: `default-${achievement.title.toLowerCase().replace(/\s+/g, '-')}`,
          ...achievement,
        },
      });
    }

    return { message: 'Default achievements seeded successfully' };
  },
};
