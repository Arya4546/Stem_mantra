import multer, { FileFilterCallback, StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';
import { BadRequestError } from '../utils/errors';

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// File size limits
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB

// Ensure upload directories exist
const ensureDirectoryExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Memory storage for Cloudinary uploads
const memoryStorage = multer.memoryStorage();

// Disk storage for local development
const createDiskStorage = (folder: string): StorageEngine => {
  const uploadDir = path.join(__dirname, '../../uploads', folder);
  ensureDirectoryExists(uploadDir);

  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });
};

// Image file filter
const imageFileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError(`Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`));
  }
};

// Document file filter
const documentFileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (ALLOWED_DOCUMENT_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError(`Invalid file type. Allowed types: ${ALLOWED_DOCUMENT_TYPES.join(', ')}`));
  }
};

// Combined file filter (images + documents)
const combinedFileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
  }
};

// Upload middleware for Cloudinary (memory storage)
export const uploadToCloudinary = {
  single: (fieldName: string) =>
    multer({
      storage: memoryStorage,
      limits: { fileSize: MAX_IMAGE_SIZE },
      fileFilter: imageFileFilter,
    }).single(fieldName),

  multiple: (fieldName: string, maxCount: number = 10) =>
    multer({
      storage: memoryStorage,
      limits: { fileSize: MAX_IMAGE_SIZE },
      fileFilter: imageFileFilter,
    }).array(fieldName, maxCount),

  fields: (fields: multer.Field[]) =>
    multer({
      storage: memoryStorage,
      limits: { fileSize: MAX_IMAGE_SIZE },
      fileFilter: imageFileFilter,
    }).fields(fields),
};

// Upload middleware for local storage (development)
export const uploadToLocal = {
  single: (fieldName: string, folder: string = 'general') =>
    multer({
      storage: createDiskStorage(folder),
      limits: { fileSize: MAX_IMAGE_SIZE },
      fileFilter: imageFileFilter,
    }).single(fieldName),

  multiple: (fieldName: string, folder: string = 'general', maxCount: number = 10) =>
    multer({
      storage: createDiskStorage(folder),
      limits: { fileSize: MAX_IMAGE_SIZE },
      fileFilter: imageFileFilter,
    }).array(fieldName, maxCount),
};

// Document upload middleware
export const uploadDocument = {
  single: (fieldName: string) =>
    multer({
      storage: memoryStorage,
      limits: { fileSize: MAX_DOCUMENT_SIZE },
      fileFilter: documentFileFilter,
    }).single(fieldName),

  multiple: (fieldName: string, maxCount: number = 5) =>
    multer({
      storage: memoryStorage,
      limits: { fileSize: MAX_DOCUMENT_SIZE },
      fileFilter: documentFileFilter,
    }).array(fieldName, maxCount),
};

// Combined upload middleware
export const uploadAny = multer({
  storage: memoryStorage,
  limits: { fileSize: MAX_DOCUMENT_SIZE },
  fileFilter: combinedFileFilter,
});

// Helper function to get file from request
export const getUploadedFile = (req: Request): Express.Multer.File | undefined => {
  return req.file;
};

// Helper function to get multiple files from request
export const getUploadedFiles = (req: Request): Express.Multer.File[] => {
  return (req.files as Express.Multer.File[]) || [];
};

export default {
  uploadToCloudinary,
  uploadToLocal,
  uploadDocument,
  uploadAny,
  getUploadedFile,
  getUploadedFiles,
};
