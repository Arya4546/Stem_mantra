import { Router } from 'express';
import {
  getMyWishlist,
  addToWishlist,
  removeProductFromWishlist,
  removeProgramFromWishlist,
  clearWishlist,
  checkWishlistItem,
} from '../controllers/wishlist.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

// All wishlist routes require authentication
router.use(authenticate);

// Get user's wishlist
router.get('/me', getMyWishlist);

// Check if item is in wishlist
router.get('/check', checkWishlistItem);

// Add item to wishlist
router.post('/', addToWishlist);

// Remove product from wishlist
router.delete('/product/:productId', removeProductFromWishlist);

// Remove program from wishlist
router.delete('/program/:programId', removeProgramFromWishlist);

// Clear entire wishlist
router.delete('/clear', clearWishlist);

export default router;
