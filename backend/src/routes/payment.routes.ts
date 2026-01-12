import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate, authorize } from '../middlewares/auth';
import {
  initiatePayment,
  verifyPayment,
  handleWebhook,
  getPaymentDetails,
  initiateRefund,
  getSupportedMethods,
  initiateEnrollmentPayment,
  verifyEnrollmentPayment,
} from '../controllers/payment.controller';

const router = Router();

// ============================================
// Public Routes
// ============================================

/**
 * @route   GET /api/v1/payments/methods
 * @desc    Get supported payment methods
 * @access  Public
 */
router.get('/methods', getSupportedMethods);

/**
 * @route   POST /api/v1/payments/webhook
 * @desc    Handle Razorpay webhook
 * @access  Public (verified by signature)
 */
router.post('/webhook', handleWebhook);

// ============================================
// Protected Routes (User)
// ============================================

/**
 * @route   POST /api/v1/payments/initiate/:orderId
 * @desc    Initiate payment for an order
 * @access  Private
 */
router.post('/initiate/:orderId', authenticate, initiatePayment);

/**
 * @route   POST /api/v1/payments/verify
 * @desc    Verify payment after completion
 * @access  Private
 */
router.post('/verify', authenticate, verifyPayment);

/**
 * @route   POST /api/v1/payments/enrollment/initiate
 * @desc    Initiate payment for program enrollment
 * @access  Private
 */
router.post('/enrollment/initiate', authenticate, initiateEnrollmentPayment);

/**
 * @route   POST /api/v1/payments/enrollment/verify
 * @desc    Verify enrollment payment
 * @access  Private
 */
router.post('/enrollment/verify', authenticate, verifyEnrollmentPayment);

// ============================================
// Admin Routes
// ============================================

/**
 * @route   GET /api/v1/payments/:paymentId
 * @desc    Get payment details
 * @access  Private (Admin)
 */
router.get(
  '/:paymentId',
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER),
  getPaymentDetails
);

/**
 * @route   POST /api/v1/payments/refund/:orderId
 * @desc    Initiate refund for an order
 * @access  Private (Admin)
 */
router.post(
  '/refund/:orderId',
  authenticate,
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  initiateRefund
);

export default router;
