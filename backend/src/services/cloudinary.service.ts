import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import config from '../config';
import logger from '../utils/logger';
import { BadRequestError } from '../utils/errors';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
});

export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  resourceType: string;
}

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'crop';
  quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
}

type CloudinaryFolder = 'products' | 'gallery' | 'blog' | 'avatars' | 'banners' | 'testimonials' | 'courses' | 'general';

class CloudinaryService {
  private readonly baseFolder: string;

  constructor() {
    this.baseFolder = config.cloudinary.folder;
  }

  /**
   * Upload a single image from buffer
   */
  async uploadImage(
    buffer: Buffer,
    folder: CloudinaryFolder,
    options?: {
      publicId?: string;
      transformation?: ImageTransformOptions;
    }
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uploadOptions: Record<string, unknown> = {
        folder: `${this.baseFolder}/${folder}`,
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        transformation: [
          {
            quality: 'auto:good',
            fetch_format: 'auto',
          },
        ],
      };

      if (options?.publicId) {
        uploadOptions.public_id = options.publicId;
      }

      if (options?.transformation) {
        uploadOptions.transformation = [
          {
            ...options.transformation,
            quality: options.transformation.quality || 'auto:good',
          },
        ];
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            logger.error('Cloudinary upload error:', error);
            reject(new BadRequestError('Failed to upload image'));
            return;
          }

          if (!result) {
            reject(new BadRequestError('No result from Cloudinary'));
            return;
          }

          resolve({
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
            resourceType: result.resource_type,
          });
        }
      );

      uploadStream.end(buffer);
    });
  }

  /**
   * Upload image from URL
   */
  async uploadFromUrl(
    url: string,
    folder: CloudinaryFolder,
    publicId?: string
  ): Promise<UploadResult> {
    try {
      const result = await cloudinary.uploader.upload(url, {
        folder: `${this.baseFolder}/${folder}`,
        public_id: publicId,
        resource_type: 'image',
        transformation: [
          {
            quality: 'auto:good',
            fetch_format: 'auto',
          },
        ],
      });

      return {
        publicId: result.public_id,
        url: result.url,
        secureUrl: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        resourceType: result.resource_type,
      };
    } catch (error) {
      logger.error('Cloudinary URL upload error:', error);
      throw new BadRequestError('Failed to upload image from URL');
    }
  }

  /**
   * Delete an image by public ID
   */
  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      logger.error('Cloudinary delete error:', error);
      return false;
    }
  }

  /**
   * Delete multiple images
   */
  async deleteImages(publicIds: string[]): Promise<{ deleted: string[]; failed: string[] }> {
    const deleted: string[] = [];
    const failed: string[] = [];

    await Promise.all(
      publicIds.map(async (publicId) => {
        const success = await this.deleteImage(publicId);
        if (success) {
          deleted.push(publicId);
        } else {
          failed.push(publicId);
        }
      })
    );

    return { deleted, failed };
  }

  /**
   * Generate optimized image URL with transformations
   */
  getOptimizedUrl(
    publicId: string,
    options?: ImageTransformOptions
  ): string {
    const transformations: Record<string, unknown> = {
      quality: options?.quality || 'auto:good',
      fetch_format: options?.format || 'auto',
    };

    if (options?.width) transformations.width = options.width;
    if (options?.height) transformations.height = options.height;
    if (options?.crop) transformations.crop = options.crop;
    if (options?.gravity) transformations.gravity = options.gravity;

    return cloudinary.url(publicId, {
      secure: true,
      transformation: [transformations],
    });
  }

  /**
   * Generate responsive image URLs for different breakpoints
   */
  getResponsiveUrls(
    publicId: string,
    breakpoints: number[] = [320, 640, 768, 1024, 1280, 1536]
  ): Record<number, string> {
    const urls: Record<number, string> = {};

    breakpoints.forEach((width) => {
      urls[width] = this.getOptimizedUrl(publicId, {
        width,
        crop: 'fill',
        quality: 'auto:good',
        format: 'auto',
      });
    });

    return urls;
  }

  /**
   * Generate thumbnail URL
   */
  getThumbnailUrl(
    publicId: string,
    size: number = 150
  ): string {
    return this.getOptimizedUrl(publicId, {
      width: size,
      height: size,
      crop: 'thumb',
      gravity: 'auto',
      quality: 'auto:good',
      format: 'auto',
    });
  }

  /**
   * Upload multiple images
   */
  async uploadMultiple(
    files: Array<{ buffer: Buffer; originalname: string }>,
    folder: CloudinaryFolder
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = [];

    for (const file of files) {
      const result = await this.uploadImage(file.buffer, folder);
      results.push(result);
    }

    return results;
  }

  /**
   * Get all images in a folder
   */
  async getImagesInFolder(
    folder: CloudinaryFolder,
    options?: { maxResults?: number; nextCursor?: string }
  ): Promise<{
    images: UploadResult[];
    nextCursor?: string;
    totalCount: number;
  }> {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: `${this.baseFolder}/${folder}`,
        max_results: options?.maxResults || 50,
        next_cursor: options?.nextCursor,
      });

      const images: UploadResult[] = result.resources.map((resource: Record<string, unknown>) => ({
        publicId: resource.public_id as string,
        url: resource.url as string,
        secureUrl: resource.secure_url as string,
        width: resource.width as number,
        height: resource.height as number,
        format: resource.format as string,
        bytes: resource.bytes as number,
        resourceType: resource.resource_type as string,
      }));

      return {
        images,
        nextCursor: result.next_cursor,
        totalCount: result.rate_limit_remaining,
      };
    } catch (error) {
      logger.error('Cloudinary get images error:', error);
      throw new BadRequestError('Failed to fetch images');
    }
  }

  /**
   * Check if Cloudinary is configured
   */
  isConfigured(): boolean {
    return !!(
      config.cloudinary.cloudName &&
      config.cloudinary.apiKey &&
      config.cloudinary.apiSecret
    );
  }
}

export const cloudinaryService = new CloudinaryService();
export default cloudinaryService;
