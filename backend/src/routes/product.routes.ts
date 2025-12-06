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

// ============ PRODUCTS ============

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// Admin routes
router.post('/', authenticate, authorize('ADMIN'), createProduct);
router.put('/:id', authenticate, authorize('ADMIN'), updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteProduct);
router.patch('/:id/stock', authenticate, authorize('ADMIN'), updateStock);

// ============ CART ============

// All cart routes require authentication
router.get('/cart/me', authenticate, getCart);
router.post('/cart', authenticate, addToCart);
router.patch('/cart/:itemId', authenticate, updateCartItem);
router.delete('/cart/:itemId', authenticate, removeFromCart);
router.delete('/cart', authenticate, clearCart);

// ============ REVIEWS ============

// Public routes
router.get('/:productId/reviews', getProductReviews);

// Authenticated users can add reviews
router.post('/:productId/reviews', authenticate, addReview);
router.put('/reviews/:id', authenticate, updateReview);
router.delete('/reviews/:id', authenticate, deleteReview);

export default router;
