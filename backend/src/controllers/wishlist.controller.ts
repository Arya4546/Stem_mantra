import { Request, Response, NextFunction } from 'express';
import wishlistService from '../services/wishlist.service';
import { asyncHandler, sendSuccess, sendCreated } from '../utils/response';
import { BadRequestError } from '../utils/errors';

// Get user's wishlist
export const getMyWishlist = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }

  const wishlist = await wishlistService.getWishlist(userId);
  sendSuccess(res, wishlist, 'Wishlist fetched successfully');
});

// Add item to wishlist
export const addToWishlist = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  const { type, itemId } = req.body;

  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }

  if (!type || !itemId) {
    throw new BadRequestError('Type and itemId are required');
  }

  if (!['product', 'program'].includes(type)) {
    throw new BadRequestError('Type must be either "product" or "program"');
  }

  const item = await wishlistService.addToWishlist(userId, type, itemId);
  sendCreated(res, item, 'Item added to wishlist');
});

// Remove product from wishlist
export const removeProductFromWishlist = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  const { productId } = req.params;

  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }

  await wishlistService.removeProductFromWishlist(userId, productId);
  sendSuccess(res, null, 'Product removed from wishlist');
});

// Remove program from wishlist
export const removeProgramFromWishlist = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  const { programId } = req.params;

  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }

  await wishlistService.removeProgramFromWishlist(userId, programId);
  sendSuccess(res, null, 'Program removed from wishlist');
});

// Clear wishlist
export const clearWishlist = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }

  await wishlistService.clearWishlist(userId);
  sendSuccess(res, null, 'Wishlist cleared');
});

// Check if item is in wishlist
export const checkWishlistItem = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  const { type, itemId } = req.query;

  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }

  if (!type || !itemId) {
    throw new BadRequestError('Type and itemId are required');
  }

  const isInWishlist = await wishlistService.isInWishlist(userId, type as 'product' | 'program', itemId as string);
  sendSuccess(res, { isInWishlist }, 'Wishlist check completed');
});
