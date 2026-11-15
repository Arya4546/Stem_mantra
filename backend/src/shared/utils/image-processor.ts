import sharp from 'sharp';
import { AppError, HttpStatus } from '../errors/app-error';

// Keep memory/CPU predictable on a shared VPS.
sharp.cache(false);
sharp.concurrency(2);

export const UPLOAD_PURPOSES = ['gallery', 'client-logo', 'testimonial', 'blog-cover', 'blog-inline'] as const;
export type UploadPurpose = (typeof UPLOAD_PURPOSES)[number];

const MAX_DIMENSION: Record<UploadPurpose, number> = {
  gallery: 2000,
  'blog-cover': 1920,
  'blog-inline': 1600,
  'client-logo': 800,
  testimonial: 600,
};

const ACCEPTED_FORMATS = new Set(['jpeg', 'png', 'webp', 'avif', 'gif', 'svg', 'heif', 'tiff']);
const THUMB_WIDTH = 640;

export interface ProcessedImage {
  full: Buffer;
  width: number;
  height: number;
  thumb: Buffer | null;
  blurDataUrl: string;
  mimeType: 'image/webp';
}

/**
 * Validates the *content* (not the client-supplied MIME type), auto-rotates, strips all metadata
 * (EXIF/GPS), resizes and re-encodes to WebP. Re-encoding also neutralises any payload hidden in
 * the original file (SVGs are rasterised, so no script can survive).
 */
export async function processImage(input: Buffer, purpose: UploadPurpose): Promise<ProcessedImage> {
  let meta: sharp.Metadata;
  try {
    meta = await sharp(input, { failOn: 'error', limitInputPixels: 80_000_000 }).metadata();
  } catch {
    throw new AppError('This file is not a valid image.', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
  if (!meta.format || !ACCEPTED_FORMATS.has(meta.format)) {
    throw new AppError('Unsupported image type. Use JPG, PNG, WebP, AVIF, GIF or SVG.', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
  if (!meta.width || !meta.height || meta.width < 16 || meta.height < 16) {
    throw new AppError('The image is too small.', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  const source = () =>
    sharp(input, {
      failOn: 'error',
      limitInputPixels: 80_000_000,
      animated: false,
      density: meta.format === 'svg' ? 300 : undefined,
    }).rotate();

  const max = MAX_DIMENSION[purpose];
  const quality = purpose === 'client-logo' ? 90 : 82;

  const full = await source()
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality, effort: 4, smartSubsample: true })
    .toBuffer({ resolveWithObject: true });

  const thumb =
    full.info.width > THUMB_WIDTH + 100
      ? await source().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 74, effort: 4 }).toBuffer()
      : null;

  const blur = await source().resize({ width: 24, height: 24, fit: 'inside' }).webp({ quality: 40 }).toBuffer();

  return {
    full: full.data,
    width: full.info.width,
    height: full.info.height,
    thumb,
    blurDataUrl: `data:image/webp;base64,${blur.toString('base64')}`,
    mimeType: 'image/webp',
  };
}

/** Width/height of an image file on disk (used when importing the images shipped with the site). */
export async function readImageSize(filePath: string): Promise<{ width?: number; height?: number }> {
  try {
    const meta = await sharp(filePath).metadata();
    // Respect EXIF orientation: portrait photos stored rotated report swapped dimensions.
    const rotated = (meta.orientation ?? 1) >= 5;
    return rotated ? { width: meta.height, height: meta.width } : { width: meta.width, height: meta.height };
  } catch {
    return {};
  }
}
