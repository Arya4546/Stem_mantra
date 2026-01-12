import { Router } from 'express';
import { UserRole } from '@prisma/client';
import {
  getMyEnrollments,
  getEnrollmentById,
  enrollInProgram,
  updateProgress,
  getAllEnrollments,
  getEnrollmentStats,
} from '../controllers/enrollment.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ============ USER ROUTES ============

// Get user's enrollments
router.get('/me', authenticate, getMyEnrollments);

// Enroll in a program
router.post('/', authenticate, enrollInProgram);

// Get a single enrollment
router.get('/:id', authenticate, getEnrollmentById);

// Update enrollment progress
router.patch('/:id/progress', authenticate, updateProgress);

// ============ ADMIN ROUTES ============

// Get all enrollments (admin)
router.get('/', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), getAllEnrollments);

// Get enrollment stats (admin)
router.get('/stats/overview', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), getEnrollmentStats);

export default router;
