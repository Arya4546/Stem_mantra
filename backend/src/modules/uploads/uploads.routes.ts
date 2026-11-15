import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { env } from '../../config/env';
import { uploadLimiter } from '../../config/rate-limit';
import { asyncHandler } from '../../shared/utils/async-handler';
import { sendSuccess } from '../../shared/utils/response';
import { AppError, HttpStatus } from '../../shared/errors/app-error';
import { UPLOAD_PURPOSES } from '../../shared/utils/image-processor';
import { createUploadedAsset } from '../media/media.service';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.MAX_UPLOAD_MB * 1024 * 1024, files: 1, fields: 5, parts: 8 },
  fileFilter: (_req, file, cb) => {
    // Cheap early rejection; the real check is done on the decoded bytes by sharp.
    if (!file.mimetype.startsWith('image/')) {
      cb(new AppError('Only image files can be uploaded.', HttpStatus.UNSUPPORTED_MEDIA_TYPE));
      return;
    }
    cb(null, true);
  },
});

const bodySchema = z.object({ purpose: z.enum(UPLOAD_PURPOSES).default('gallery') });

const router = Router();

router.post(
  '/',
  uploadLimiter,
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) throw AppError.badRequest('Choose an image to upload.');
    const parsed = bodySchema.safeParse(req.body ?? {});
    if (!parsed.success) throw AppError.badRequest('Invalid upload purpose.');

    const asset = await createUploadedAsset({
      buffer: req.file.buffer,
      originalName: req.file.originalname,
      purpose: parsed.data.purpose,
      userId: req.user!.id,
    });
    sendSuccess(res, asset, 'Image uploaded', HttpStatus.CREATED);
  }),
);

export { router as uploadRoutes };
