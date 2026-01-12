import { Router } from 'express';
import {
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getProductReviews,
  addReview,
  updateReview,
  deleteReview
} from '../controllers/product.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ============ CART ============
// Cart routes MUST come before /:id routes to avoid conflicts
router.get('/cart/me', authenticate, getCart);
router.post('/cart', authenticate, addToCart);
router.patch('/cart/:itemId', authenticate, updateCartItem);
router.delete('/cart/clear', authenticate, clearCart);
router.delete('/cart/:itemId', authenticate, removeFromCart);

// ============ REVIEWS ============
// Review routes with specific paths before generic /:id
router.get('/reviews/:id', authenticate, (_req, _res, next) => next()); // placeholder for getReviewById if needed
router.put('/reviews/:id', authenticate, updateReview);
router.delete('/reviews/:id', authenticate, deleteReview);

// ============ PRODUCTS ============

// Public routes - specific paths first
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/categories', (_req, res) => {
  // Return empty categories for now or implement categories endpoint
  res.json({ success: true, data: [], message: 'Categories fetched' });
});

// Product reviews - must be before /:id
router.get('/:productId/reviews', getProductReviews);
router.post('/:productId/reviews', authenticate, addReview);

// Generic ID routes LAST
router.get('/:id', getProductById);

// Admin routes
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), createProduct);
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), deleteProduct);
router.patch('/:id/stock', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'MANAGER'), updateStock);

export default router;
