import { body, param, query } from 'express-validator';

// ============ BLOG POSTS ============

export const createPostValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 100 }).withMessage('Content must be at least 100 characters'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Excerpt must be less than 500 characters'),
  body('categoryId')
    .optional()
    .isUUID().withMessage('Invalid category ID'),
  body('authorId')
    .optional()
    .isUUID().withMessage('Invalid author ID'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('isPublished')
    .optional()
    .isBoolean().withMessage('isPublished must be a boolean'),
  body('isFeatured')
    .optional()
    .isBoolean().withMessage('isFeatured must be a boolean'),
];

export const updatePostValidator = [
  param('id')
    .isUUID().withMessage('Invalid post ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 100 }).withMessage('Content must be at least 100 characters'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Excerpt must be less than 500 characters'),
];

export const getPostBySlugValidator = [
  param('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Invalid slug format'),
];

// ============ CATEGORIES ============

export const createCategoryValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
];

// ============ AUTHORS ============

export const createAuthorValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Bio must be less than 1000 characters'),
];

// ============ COMMENTS ============

export const createCommentValidator = [
  body('content')
    .trim()
    .notEmpty().withMessage('Comment content is required')
    .isLength({ min: 5, max: 2000 }).withMessage('Comment must be between 5 and 2000 characters'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),
];

// ============ QUERY VALIDATORS ============

export const blogQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category')
    .optional()
    .trim(),
  query('tag')
    .optional()
    .trim(),
  query('search')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Search query too long'),
  query('featured')
    .optional()
    .isIn(['true', 'false']).withMessage('Featured must be true or false'),
];
