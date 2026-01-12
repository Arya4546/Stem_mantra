import { Request, Response, NextFunction } from 'express';
import productService from '../services/product.service';
import { asyncHandler, sendSuccess, sendPaginated, sendCreated } from '../utils/response';
import { BadRequestError } from '../utils/errors';

// ============ PRODUCTS ============

export const getAllProducts = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const category = req.query.category as string;
  const status = req.query.status as string; // 'all', 'ACTIVE', 'DRAFT', 'ARCHIVED'
  const type = req.query.type as string;
  const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
  const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
  const search = req.query.search as string;
  const sortBy = req.query.sortBy as 'price' | 'name' | 'createdAt' | 'popularity';
  const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
  const isFeatured = req.query.featured === 'true' ? true : undefined;

  const result = await productService.getAllProducts({ 
    page, 
    limit, 
    category,
    status,
    type,
    minPrice, 
    maxPrice, 
    search,
    sortBy,
    sortOrder,
    isFeatured
  });
  
  sendPaginated(res, result.products, page, limit, result.meta.total, 'Products fetched successfully');
});

export const getFeaturedProducts = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 8;
  const result = await productService.getAllProducts({ isFeatured: true, limit });
  sendSuccess(res, result.products, 'Featured products fetched successfully');
});

export const getProductBySlug = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { slug } = req.params;
  const product = await productService.getProductBySlug(slug);
  sendSuccess(res, product, 'Product fetched successfully');
});

export const getProductById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  sendSuccess(res, product, 'Product fetched successfully');
});

export const createProduct = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const product = await productService.createProduct(req.body);
  sendCreated(res, product, 'Product created successfully');
});

export const updateProduct = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const product = await productService.updateProduct(id, req.body);
  sendSuccess(res, product, 'Product updated successfully');
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await productService.deleteProduct(id);
  sendSuccess(res, null, 'Product deleted successfully');
});

export const updateStock = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { stock } = req.body;
  
  if (typeof stock !== 'number' || stock < 0) {
    throw new BadRequestError('Invalid stock value');
  }
  
  const product = await productService.updateStock(id, stock);
  sendSuccess(res, product, 'Stock updated successfully');
});

// ============ CART ============

export const getCart = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;
  
  const cart = await productService.getOrCreateCart(sessionId, userId);
  const cartDetails = await productService.getCartDetails(cart.id);
  sendSuccess(res, cartDetails, 'Cart fetched successfully');
});

export const addToCart = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;
  const { productId, quantity } = req.body;
  
  if (!productId || !quantity || quantity < 1) {
    throw new BadRequestError('Invalid product or quantity');
  }
  
  const cart = await productService.getOrCreateCart(sessionId, userId);
  const cartItem = await productService.addToCart(cart.id, productId, quantity);
  sendCreated(res, cartItem, 'Item added to cart successfully');
});

export const updateCartItem = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const userId = (req as any).user?.id;
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;
  
  if (!quantity || quantity < 1) {
    throw new BadRequestError('Invalid quantity');
  }
  
  const cart = await productService.getOrCreateCart(sessionId, userId);
  const cartItem = await productService.updateCartItem(cart.id, itemId, quantity);
  sendSuccess(res, cartItem, 'Cart item updated successfully');
});

export const removeFromCart = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { itemId } = req.params;
  const userId = (req as any).user?.id;
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;
  
  const cart = await productService.getOrCreateCart(sessionId, userId);
  await productService.removeFromCart(cart.id, itemId);
  sendSuccess(res, null, 'Item removed from cart successfully');
});

export const clearCart = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;
  
  const cart = await productService.getOrCreateCart(sessionId, userId);
  await productService.clearCart(cart.id);
  sendSuccess(res, null, 'Cart cleared successfully');
});

// ============ REVIEWS ============

export const getProductReviews = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { productId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const result = await productService.getProductReviews(productId, page, limit);
  sendPaginated(res, result.reviews, page, limit, result.meta.total, 'Reviews fetched successfully');
});

export const addReview = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { productId } = req.params;
  const userId = (req as any).user?.id;
  
  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }
  
  const review = await productService.createReview({
    ...req.body,
    productId,
    userId
  });
  
  sendCreated(res, review, 'Review added successfully');
});

export const updateReview = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const userId = (req as any).user?.id;
  
  const review = await productService.updateReview(id, userId, req.body);
  sendSuccess(res, review, 'Review updated successfully');
});

export const deleteReview = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const userId = (req as any).user?.id;
  const isAdmin = (req as any).user?.role === 'ADMIN';
  
  await productService.deleteReview(id, userId, isAdmin);
  sendSuccess(res, null, 'Review deleted successfully');
});
