import { Request, Response, NextFunction } from 'express';
import { asyncHandler, sendSuccess, sendCreated } from '../utils/response';
import { cloudinaryService } from '../services/cloudinary.service';
import { BadRequestError } from '../utils/errors';
import config from '../config';
import path from 'path';

type CloudinaryFolder = 'products' | 'gallery' | 'blog' | 'avatars' | 'banners' | 'testimonials' | 'courses' | 'general';

// Upload single image
export const uploadImage = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  if (!req.file) {
    throw new BadRequestError('No file uploaded');
  }

  const folder = (req.body.folder || 'general') as CloudinaryFolder;

  // Check if Cloudinary is configured
  if (cloudinaryService.isConfigured()) {
    const result = await cloudinaryService.uploadImage(req.file.buffer, folder);
    return sendCreated(res, result, 'Image uploaded successfully');
  }

  // Fallback to local storage URL for development
  const localUrl = `${config.backendUrl}/uploads/${folder}/${req.file.filename || req.file.originalname}`;
  return sendCreated(res, {
    publicId: `local-${Date.now()}`,
    url: localUrl,
    secureUrl: localUrl,
    width: 0,
    height: 0,
    format: path.extname(req.file.originalname).slice(1),
    bytes: req.file.size,
    resourceType: 'image',
  }, 'Image uploaded locally (Cloudinary not configured)');
});

// Upload multiple images
export const uploadImages = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    throw new BadRequestError('No files uploaded');
  }

  const folder = (req.body.folder || 'general') as CloudinaryFolder;

  if (cloudinaryService.isConfigured()) {
    const results = await cloudinaryService.uploadMultiple(files, folder);
    return sendCreated(res, results, `${results.length} images uploaded successfully`);
  }

  // Fallback for development
  const results = files.map((file) => ({
    publicId: `local-${Date.now()}-${Math.random()}`,
    url: `${config.backendUrl}/uploads/${folder}/${file.filename || file.originalname}`,
    secureUrl: `${config.backendUrl}/uploads/${folder}/${file.filename || file.originalname}`,
    width: 0,
    height: 0,
    format: path.extname(file.originalname).slice(1),
    bytes: file.size,
    resourceType: 'image',
  }));

  return sendCreated(res, results, `${results.length} images uploaded locally`);
});

// Delete image
export const deleteImage = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { publicId } = req.params;

  if (!publicId) {
    throw new BadRequestError('Public ID is required');
  }

  if (!cloudinaryService.isConfigured()) {
    return sendSuccess(res, { deleted: true }, 'Image deleted (local mode)');
  }

  const success = await cloudinaryService.deleteImage(publicId);
  
  if (success) {
    return sendSuccess(res, { deleted: true }, 'Image deleted successfully');
  }

  throw new BadRequestError('Failed to delete image');
});

// Get optimized image URL
export const getOptimizedUrl = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { publicId } = req.params;
  const { width, height, crop, quality, format } = req.query;

  if (!publicId) {
    throw new BadRequestError('Public ID is required');
  }

  const url = cloudinaryService.getOptimizedUrl(publicId, {
    width: width ? parseInt(width as string) : undefined,
    height: height ? parseInt(height as string) : undefined,
    crop: crop as 'fill' | 'fit' | 'scale' | 'thumb' | 'crop' | undefined,
    quality: quality as 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | undefined,
    format: format as 'auto' | 'webp' | 'avif' | 'jpg' | 'png' | undefined,
  });

  return sendSuccess(res, { url }, 'Optimized URL generated');
});

// Get responsive URLs
export const getResponsiveUrls = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { publicId } = req.params;
  const { breakpoints } = req.query;

  if (!publicId) {
    throw new BadRequestError('Public ID is required');
  }

  const bps = breakpoints 
    ? (breakpoints as string).split(',').map(Number)
    : undefined;

  const urls = cloudinaryService.getResponsiveUrls(publicId, bps);

  return sendSuccess(res, urls, 'Responsive URLs generated');
});

// Upload avatar
export const uploadAvatar = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  if (!req.file) {
    throw new BadRequestError('No file uploaded');
  }

  if (cloudinaryService.isConfigured()) {
    const result = await cloudinaryService.uploadImage(req.file.buffer, 'avatars', {
      transformation: {
        width: 200,
        height: 200,
        crop: 'fill',
        gravity: 'face',
      },
    });
    return sendCreated(res, result, 'Avatar uploaded successfully');
  }

  const localUrl = `${config.backendUrl}/uploads/avatars/${req.file.filename || req.file.originalname}`;
  return sendCreated(res, {
    publicId: `local-avatar-${Date.now()}`,
    url: localUrl,
    secureUrl: localUrl,
    width: 200,
    height: 200,
    format: path.extname(req.file.originalname).slice(1),
    bytes: req.file.size,
    resourceType: 'image',
  }, 'Avatar uploaded locally');
});

// Upload banner
export const uploadBanner = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  if (!req.file) {
    throw new BadRequestError('No file uploaded');
  }

  if (cloudinaryService.isConfigured()) {
    const result = await cloudinaryService.uploadImage(req.file.buffer, 'banners', {
      transformation: {
        width: 1920,
        height: 600,
        crop: 'fill',
      },
    });
    return sendCreated(res, result, 'Banner uploaded successfully');
  }

  const localUrl = `${config.backendUrl}/uploads/banners/${req.file.filename || req.file.originalname}`;
  return sendCreated(res, {
    publicId: `local-banner-${Date.now()}`,
    url: localUrl,
    secureUrl: localUrl,
    width: 1920,
    height: 600,
    format: path.extname(req.file.originalname).slice(1),
    bytes: req.file.size,
    resourceType: 'image',
  }, 'Banner uploaded locally');
});
