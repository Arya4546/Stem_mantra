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

const router = Router();

// ============ BLOG POSTS ============

// Public routes
router.get('/posts', getAllPosts);
router.get('/posts/:slug', getPostBySlug);
router.get('/posts/:slug/seo', getPostSEO);

// Protected routes (admin only)
router.post('/posts', authenticate, authorize('ADMIN'), createPost);
router.put('/posts/:id', authenticate, authorize('ADMIN'), updatePost);
router.delete('/posts/:id', authenticate, authorize('ADMIN'), deletePost);

// ============ CATEGORIES ============

// Public routes
router.get('/categories', getAllCategories);
router.get('/categories/:slug', getCategoryBySlug);

// Protected routes (admin only)
router.post('/categories', authenticate, authorize('ADMIN'), createCategory);
router.put('/categories/:id', authenticate, authorize('ADMIN'), updateCategory);
router.delete('/categories/:id', authenticate, authorize('ADMIN'), deleteCategory);

// ============ AUTHORS ============

// Public routes
router.get('/authors', getAllAuthors);
router.get('/authors/:id', getAuthorById);

// Protected routes (admin only)
router.post('/authors', authenticate, authorize('ADMIN'), createAuthor);
router.put('/authors/:id', authenticate, authorize('ADMIN'), updateAuthor);
router.delete('/authors/:id', authenticate, authorize('ADMIN'), deleteAuthor);

// ============ COMMENTS ============

// Public routes
router.get('/posts/:postId/comments', getPostComments);

// Authenticated users can comment
router.post('/posts/:postId/comments', authenticate, createComment);

// Admin routes
router.patch('/comments/:id/approve', authenticate, authorize('ADMIN'), approveComment);
router.delete('/comments/:id', authenticate, authorize('ADMIN'), deleteComment);

export default router;
