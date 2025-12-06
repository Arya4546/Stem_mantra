import { Router } from 'express';
import * as programController from '../controllers/program.controller';

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

export default router;
