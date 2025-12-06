import { Router } from 'express';
import {
  createOrderFromCart,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  getOrderStats,
  trackOrder
} from '../controllers/order.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ============ PUBLIC ROUTES ============

// Track order by order number (no auth required)
router.get('/track/:orderNumber', trackOrder);

// ============ AUTHENTICATED USER ROUTES ============

// Create order from cart
router.post('/', authenticate, createOrderFromCart);

// Get user's own orders
router.get('/me', authenticate, getMyOrders);

// Get specific order (user can only view their own)
router.get('/:id', authenticate, getOrderById);

// Cancel order (user can cancel their own pending orders)
router.patch('/:id/cancel', authenticate, cancelOrder);

// ============ ADMIN ROUTES ============

// Get all orders
router.get('/', authenticate, authorize('ADMIN'), getAllOrders);

// Update order status
router.patch('/:id/status', authenticate, authorize('ADMIN'), updateOrderStatus);

// Update payment status
router.patch('/:id/payment', authenticate, authorize('ADMIN'), updatePaymentStatus);

// Get order statistics
router.get('/stats/overview', authenticate, authorize('ADMIN'), getOrderStats);

export default router;
