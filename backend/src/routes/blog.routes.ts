import { Router } from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getPostSEO,
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getPostComments,
  createComment,
  approveComment,
  deleteComment
} from '../controllers/blog.controller';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// ============ BLOG POSTS ============

// Public routes
router.get('/posts', getAllPosts);
router.get('/posts/:slug', getPostBySlug);
router.get('/posts/:slug/seo', getPostSEO);

// Protected routes (admin only)
router.post('/posts', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), createPost);
router.put('/posts/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), updatePost);
router.delete('/posts/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), deletePost);

// ============ CATEGORIES ============

// Public routes
router.get('/categories', getAllCategories);
router.get('/categories/:slug', getCategoryBySlug);

// Protected routes (admin only)
router.post('/categories', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), createCategory);
router.put('/categories/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), updateCategory);
router.delete('/categories/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), deleteCategory);

// ============ AUTHORS ============

// Public routes
router.get('/authors', getAllAuthors);
router.get('/authors/:id', getAuthorById);

// Protected routes (admin only)
router.post('/authors', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), createAuthor);
router.put('/authors/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), updateAuthor);
router.delete('/authors/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), deleteAuthor);

// ============ COMMENTS ============

// Public routes
router.get('/posts/:postId/comments', getPostComments);

// Authenticated users can comment
router.post('/posts/:postId/comments', authenticate, createComment);

// Admin routes
router.patch('/comments/:id/approve', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), approveComment);
router.delete('/comments/:id', authenticate, authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER), deleteComment);

export default router;
