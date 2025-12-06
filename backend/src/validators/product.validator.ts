import { body, param, query } from 'express-validator';

// ============ PRODUCTS ============

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('comparePrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Compare price must be a positive number'),
  body('sku')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('SKU must be less than 100 characters'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Category must be less than 100 characters'),
  body('images')
    .optional()
    .isArray().withMessage('Images must be an array'),
  body('isFeatured')
    .optional()
    .isBoolean().withMessage('isFeatured must be a boolean'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
];

export const updateProductValidator = [
  param('id')
    .isUUID().withMessage('Invalid product ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
];

export const updateStockValidator = [
  param('id')
    .isUUID().withMessage('Invalid product ID'),
  body('stock')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

// ============ CART ============

export const addToCartValidator = [
  body('productId')
    .isUUID().withMessage('Invalid product ID'),
  body('quantity')
    .isInt({ min: 1, max: 99 }).withMessage('Quantity must be between 1 and 99'),
];

export const updateCartItemValidator = [
  param('itemId')
    .isUUID().withMessage('Invalid cart item ID'),
  body('quantity')
    .isInt({ min: 1, max: 99 }).withMessage('Quantity must be between 1 and 99'),
];

// ============ REVIEWS ============

export const addReviewValidator = [
  param('productId')
    .isUUID().withMessage('Invalid product ID'),
  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Content must be less than 2000 characters'),
];

export const updateReviewValidator = [
  param('id')
    .isUUID().withMessage('Invalid review ID'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Content must be less than 2000 characters'),
];

// ============ QUERY VALIDATORS ============

export const productQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category')
    .optional()
    .trim(),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  query('search')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Search query too long'),
  query('sortBy')
    .optional()
    .isIn(['price', 'name', 'createdAt', 'rating']).withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc'),
];
