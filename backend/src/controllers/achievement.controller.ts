import { Request, Response, NextFunction } from 'express';
import { achievementService } from '../services/achievement.service';
import { asyncHandler, sendSuccess } from '../utils/response';
import { BadRequestError, NotFoundError } from '../utils/errors';

// ============ Achievement Definitions (Admin) ============

export const getAllAchievementDefinitions = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const includeInactive = req.query.includeInactive === 'true';
    const definitions = await achievementService.getAllDefinitions(includeInactive);
    sendSuccess(res, definitions, 'Achievement definitions fetched successfully');
  }
);

export const getAchievementDefinitionById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const definition = await achievementService.getDefinitionById(id);
    
    if (!definition) {
      throw new NotFoundError('Achievement definition not found');
    }
    
    sendSuccess(res, definition, 'Achievement definition fetched successfully');
  }
);

export const createAchievementDefinition = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { title, description, icon, category, points, maxProgress, sortOrder } = req.body;
    
    if (!title || !description) {
      throw new BadRequestError('Title and description are required');
    }
    
    const definition = await achievementService.createDefinition({
      title,
      description,
      icon,
      category,
      points,
      maxProgress,
      sortOrder,
    });
    
    sendSuccess(res, definition, 'Achievement definition created successfully', 201);
  }
);

export const updateAchievementDefinition = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const { title, description, icon, category, points, maxProgress, isActive, sortOrder } = req.body;
    
    const definition = await achievementService.updateDefinition(id, {
      title,
      description,
      icon,
      category,
      points,
      maxProgress,
      isActive,
      sortOrder,
    });
    
    sendSuccess(res, definition, 'Achievement definition updated successfully');
  }
);

export const deleteAchievementDefinition = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    await achievementService.deleteDefinition(id);
    sendSuccess(res, null, 'Achievement definition deleted successfully');
  }
);

// ============ User Achievements ============

export const getMyAchievements = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      throw new BadRequestError('User not authenticated');
    }
    
    const achievements = await achievementService.getUserAchievements(userId);
    sendSuccess(res, achievements, 'Achievements fetched successfully');
  }
);

export const getMyAchievementStats = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      throw new BadRequestError('User not authenticated');
    }
    
    const stats = await achievementService.getUserAchievementStats(userId);
    sendSuccess(res, stats, 'Achievement stats fetched successfully');
  }
);

export const getUserAchievements = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId } = req.params;
    const achievements = await achievementService.getUserAchievements(userId);
    sendSuccess(res, achievements, 'User achievements fetched successfully');
  }
);

export const awardAchievementToUser = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId, achievementId } = req.body;
    
    if (!userId || !achievementId) {
      throw new BadRequestError('User ID and Achievement ID are required');
    }
    
    const achievement = await achievementService.awardAchievement(userId, achievementId);
    sendSuccess(res, achievement, 'Achievement awarded successfully');
  }
);

export const updateUserAchievementProgress = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId, achievementId, progress } = req.body;
    
    if (!userId || !achievementId || progress === undefined) {
      throw new BadRequestError('User ID, Achievement ID, and progress are required');
    }
    
    const achievement = await achievementService.updateUserProgress(userId, achievementId, progress);
    sendSuccess(res, achievement, 'Achievement progress updated successfully');
  }
);

// ============ Certificates ============

export const getMyCertificates = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      throw new BadRequestError('User not authenticated');
    }
    
    const certificates = await achievementService.getUserCertificates(userId);
    
    // Format certificates for frontend
    const formattedCerts = certificates.map((cert: {
      id: string;
      title: string;
      courseName: string;
      certificateNumber: string;
      certificateUrl: string | null;
      issuedAt: Date;
      enrollment: { programId: string };
    }) => ({
      id: cert.id,
      title: cert.title,
      courseName: cert.courseName,
      certificateNumber: cert.certificateNumber,
      certificateUrl: cert.certificateUrl,
      issuedAt: cert.issuedAt.toISOString(),
      programId: cert.enrollment.programId,
    }));
    
    sendSuccess(res, formattedCerts, 'Certificates fetched successfully');
  }
);

export const getCertificateById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const certificate = await achievementService.getCertificateById(id);
    
    if (!certificate) {
      throw new NotFoundError('Certificate not found');
    }
    
    sendSuccess(res, certificate, 'Certificate fetched successfully');
  }
);

export const verifyCertificate = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { certificateNumber } = req.params;
    const certificate = await achievementService.getCertificateByNumber(certificateNumber);
    
    if (!certificate) {
      throw new NotFoundError('Certificate not found or invalid');
    }
    
    sendSuccess(res, {
      valid: true,
      certificate: {
        id: certificate.id,
        title: certificate.title,
        courseName: certificate.courseName,
        certificateNumber: certificate.certificateNumber,
        issuedAt: certificate.issuedAt.toISOString(),
        holderName: `${certificate.enrollment.user.firstName} ${certificate.enrollment.user.lastName || ''}`.trim(),
      },
    }, 'Certificate verified successfully');
  }
);

export const issueCertificate = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { enrollmentId, title } = req.body;
    
    if (!enrollmentId) {
      throw new BadRequestError('Enrollment ID is required');
    }
    
    const certificate = await achievementService.issueCertificate(enrollmentId, title);
    sendSuccess(res, certificate, 'Certificate issued successfully', 201);
  }
);

export const deleteCertificate = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    await achievementService.deleteCertificate(id);
    sendSuccess(res, null, 'Certificate deleted successfully');
  }
);

// ============ Seed Default Achievements ============

export const seedDefaultAchievements = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await achievementService.seedDefaultAchievements();
    sendSuccess(res, result, 'Default achievements seeded successfully');
  }
);
