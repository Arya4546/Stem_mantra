import { Router } from 'express';
import * as programController from '../controllers/program.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

/**
 * @route   GET /api/v1/programs
 * @desc    Get all programs
 * @access  Public
 */
router.get('/', programController.getAllPrograms);

/**
 * @route   GET /api/v1/programs/featured
 * @desc    Get featured programs
 * @access  Public
 */
router.get('/featured', programController.getFeaturedPrograms);

/**
 * @route   GET /api/v1/programs/type/:type
 * @desc    Get programs by type
 * @access  Public
 */
router.get('/type/:type', programController.getProgramsByType);

/**
 * @route   GET /api/v1/programs/slug/:slug
 * @desc    Get a program by slug
 * @access  Public
 */
router.get('/slug/:slug', programController.getProgramBySlug);

/**
 * @route   GET /api/v1/programs/:id
 * @desc    Get a program by ID
 * @access  Public
 */
router.get('/:id', programController.getProgramById);

/**
 * @route   POST /api/v1/programs
 * @desc    Create a new program
 * @access  Admin
 */
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), programController.createProgram);

/**
 * @route   PUT /api/v1/programs/:id
 * @desc    Update a program
 * @access  Admin
 */
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), programController.updateProgram);

/**
 * @route   DELETE /api/v1/programs/:id
 * @desc    Delete a program
 * @access  Admin
 */
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), programController.deleteProgram);

export default router;
