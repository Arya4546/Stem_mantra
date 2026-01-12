import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler';
import enrollmentService from '../services/enrollment.service';
import { sendSuccess } from '../utils/response';

// Get user's enrollments
export const getMyEnrollments = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const enrollments = await enrollmentService.getMyEnrollments(userId);

  return sendSuccess(res, enrollments, 'Enrollments retrieved successfully');
});

// Get a single enrollment
export const getEnrollmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const enrollment = await enrollmentService.getEnrollmentById(id, userId);

  return sendSuccess(res, enrollment, 'Enrollment retrieved successfully');
});

// Enroll in a program
export const enrollInProgram = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { programId } = req.body;

  const enrollment = await enrollmentService.enrollInProgram(userId, programId);

  return sendSuccess(res, enrollment, 'Successfully enrolled in program', 201);
});

// Update enrollment progress
export const updateProgress = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const { progress } = req.body;

  const enrollment = await enrollmentService.updateProgress(id, userId, progress);

  return sendSuccess(res, enrollment, 'Progress updated successfully');
});

// Admin: Get all enrollments
export const getAllEnrollments = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, status, userId, programId } = req.query;

  const result = await enrollmentService.getAllEnrollments({
    page: page ? parseInt(page as string, 10) : undefined,
    limit: limit ? parseInt(limit as string, 10) : undefined,
    status: status as string,
    userId: userId as string,
    programId: programId as string,
  });

  return sendSuccess(res, result.enrollments, 'Enrollments retrieved successfully', 200, result.meta);
});

// Admin: Get enrollment stats
export const getEnrollmentStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await enrollmentService.getEnrollmentStats();

  return sendSuccess(res, stats, 'Enrollment stats retrieved successfully');
});
