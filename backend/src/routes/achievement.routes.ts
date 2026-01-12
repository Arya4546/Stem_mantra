import { Router } from 'express';
import { UserRole } from '@prisma/client';
import {
  // Achievement Definitions
  getAllAchievementDefinitions,
  getAchievementDefinitionById,
  createAchievementDefinition,
  updateAchievementDefinition,
  deleteAchievementDefinition,
  // User Achievements
  getMyAchievements,
  getMyAchievementStats,
  getUserAchievements,
  awardAchievementToUser,
  updateUserAchievementProgress,
  // Certificates
  getMyCertificates,
  getCertificateById,
  verifyCertificate,
  issueCertificate,
  deleteCertificate,
  // Seed
  seedDefaultAchievements,
} from '../controllers/achievement.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ============ PUBLIC ROUTES ============

// Verify certificate (public - for anyone to verify)
router.get('/certificates/verify/:certificateNumber', verifyCertificate);

// ============ USER ROUTES (Authenticated) ============

// Get my achievements
router.get('/me', authenticate, getMyAchievements);

// Get my achievement stats
router.get('/me/stats', authenticate, getMyAchievementStats);

// Get my certificates
router.get('/certificates/me', authenticate, getMyCertificates);

// Get certificate by ID
router.get('/certificates/:id', authenticate, getCertificateById);

// ============ ADMIN ROUTES ============

// Achievement Definitions
router.get(
  '/definitions',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER),
  getAllAchievementDefinitions
);

router.get(
  '/definitions/:id',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER),
  getAchievementDefinitionById
);

router.post(
  '/definitions',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  createAchievementDefinition
);

router.put(
  '/definitions/:id',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  updateAchievementDefinition
);

router.delete(
  '/definitions/:id',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  deleteAchievementDefinition
);

// User Achievements (Admin)
router.get(
  '/user/:userId',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER),
  getUserAchievements
);

router.post(
  '/award',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  awardAchievementToUser
);

router.post(
  '/progress',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  updateUserAchievementProgress
);

// Certificates (Admin)
router.post(
  '/certificates/issue',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER),
  issueCertificate
);

router.delete(
  '/certificates/:id',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  deleteCertificate
);

// Seed default achievements
router.post(
  '/seed',
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  seedDefaultAchievements
);

export default router;
