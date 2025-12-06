import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate, authorize } from '../middlewares/auth';
import { uploadToCloudinary } from '../middlewares/upload';
import { uploadLimiter } from '../middlewares/rateLimiter';
import {
  uploadImage,
  uploadImages,
  deleteImage,
  getOptimizedUrl,
  getResponsiveUrls,
  uploadAvatar,
  uploadBanner,
} from '../controllers/upload.controller';

const router = Router();

// ============ PUBLIC ROUTES ============

/**
 * @route   GET /api/v1/upload/optimize/:publicId
 * @desc    Get optimized image URL
 * @access  Public
 */
router.get('/optimize/:publicId', getOptimizedUrl);

/**
 * @route   GET /api/v1/upload/responsive/:publicId
 * @desc    Get responsive image URLs for different breakpoints
 * @access  Public
 */
router.get('/responsive/:publicId', getResponsiveUrls);

// ============ AUTHENTICATED ROUTES ============

/**
 * @route   POST /api/v1/upload/avatar
 * @desc    Upload user avatar
 * @access  Private
 */
router.post(
  '/avatar',
  authenticate,
  uploadLimiter,
  uploadToCloudinary.single('avatar'),
  uploadAvatar
);

// ============ ADMIN ROUTES ============

/**
 * @route   POST /api/v1/upload/image
 * @desc    Upload single image
 * @access  Admin
 */
router.post(
  '/image',
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER),
  uploadLimiter,
  uploadToCloudinary.single('image'),
  uploadImage
);

/**
 * @route   POST /api/v1/upload/images
 * @desc    Upload multiple images
 * @access  Admin
 */
router.post(
  '/images',
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER),
  uploadLimiter,
  uploadToCloudinary.multiple('images', 10),
  uploadImages
);

/**
 * @route   POST /api/v1/upload/banner
 * @desc    Upload banner image
 * @access  Admin
 */
router.post(
  '/banner',
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  uploadLimiter,
  uploadToCloudinary.single('banner'),
  uploadBanner
);

/**
 * @route   DELETE /api/v1/upload/:publicId
 * @desc    Delete image by public ID
 * @access  Admin
 */
router.delete(
  '/:publicId',
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  deleteImage
);

export default router;
