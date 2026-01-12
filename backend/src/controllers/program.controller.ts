import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler';
import programService from '../services/program.service';
import { sendSuccess } from '../utils/response';
import { ProgramType, ProgramStatus } from '@prisma/client';

export const getAllPrograms = asyncHandler(async (req: Request, res: Response) => {
  const {
    page,
    limit,
    type,
    status,
    isFeatured,
    search,
  } = req.query;

  const result = await programService.getAll({
    page: page ? parseInt(page as string, 10) : undefined,
    limit: limit ? parseInt(limit as string, 10) : undefined,
    type: type as ProgramType,
    status: status as ProgramStatus,
    isFeatured: isFeatured === 'true' ? true : isFeatured === 'false' ? false : undefined,
    search: search as string,
  });

  return sendSuccess(res, result.programs, 'Programs retrieved successfully', 200, result.meta);
});

export const getProgramBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const program = await programService.getBySlug(slug);

  return sendSuccess(res, program, 'Program retrieved successfully');
});

export const getProgramById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const program = await programService.getById(id);

  return sendSuccess(res, program, 'Program retrieved successfully');
});

export const getFeaturedPrograms = asyncHandler(async (_req: Request, res: Response) => {
  const programs = await programService.getFeatured();

  return sendSuccess(res, programs, 'Featured programs retrieved successfully');
});

export const getProgramsByType = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;

  const programs = await programService.getByType(type as ProgramType);

  return sendSuccess(res, programs, 'Programs retrieved successfully');
});

export const createProgram = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    slug,
    description,
    shortDescription,
    type,
    status,
    thumbnail,
    duration,
    price,
    discountPrice,
    features,
    isFeatured,
  } = req.body;

  if (!name || !slug || !type || !description || !duration || price === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Name, slug, type, description, duration, and price are required',
    });
  }

  const program = await programService.create({
    name,
    slug,
    description,
    shortDescription,
    type: type as ProgramType,
    status: status as ProgramStatus,
    icon: thumbnail,
    duration,
    price: parseFloat(price),
    discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
    features,
    isFeatured,
  });

  return sendSuccess(res, program, 'Program created successfully', 201);
});

export const updateProgram = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    slug,
    description,
    shortDescription,
    type,
    status,
    thumbnail,
    duration,
    price,
    discountPrice,
    features,
    isFeatured,
  } = req.body;

  const program = await programService.update(id, {
    name,
    slug,
    description,
    shortDescription,
    type: type as ProgramType,
    status: status as ProgramStatus,
    thumbnail,
    duration,
    price: price !== undefined ? parseFloat(price) : undefined,
    discountPrice: discountPrice !== undefined ? parseFloat(discountPrice) : undefined,
    features,
    isFeatured,
  });

  return sendSuccess(res, program, 'Program updated successfully');
});

export const deleteProgram = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await programService.delete(id);

  return sendSuccess(res, result, 'Program deleted successfully');
});
