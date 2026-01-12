import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/payment.service';
import { asyncHandler } from '../utils/response';
import logger from '../utils/logger';

// ============================================
// Initiate Payment
// ============================================

/**
 * @route   POST /api/v1/payments/initiate/:orderId
 * @desc    Initiate payment for an order
 * @access  Private
 */
export const initiatePayment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { orderId } = req.params;

    const result = await paymentService.initiatePayment(orderId);

    res.status(200).json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        orderId: result.order.id,
        orderNumber: result.order.orderNumber,
        amount: Number(result.order.total),
        currency: 'INR',
        razorpayOrderId: result.razorpayOrder.id,
        razorpayKeyId: result.keyId,
        customerName: result.order.customerName,
        customerEmail: result.order.customerEmail,
        customerPhone: result.order.customerPhone,
      },
    });
  }
);

// ============================================
// Verify Payment
// ============================================

/**
 * @route   POST /api/v1/payments/verify
 * @desc    Verify payment after completion
 * @access  Private
 */
export const verifyPayment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const result = await paymentService.verifyPayment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      orderId,
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        order: result.order,
        paymentMethod: result.paymentDetails.method,
      },
    });
  }
);

// ============================================
// Handle Webhook
// ============================================

/**
 * @route   POST /api/v1/payments/webhook
 * @desc    Handle Razorpay webhook events
 * @access  Public (verified by signature)
 */
export const handleWebhook = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const signature = req.headers['x-razorpay-signature'] as string;
    const payload = req.body;

    logger.info('Webhook received from Razorpay');

    await paymentService.handleWebhook(payload, signature);

    res.status(200).json({
      success: true,
      message: 'Webhook processed successfully',
    });
  }
);

// ============================================
// Get Payment Details
// ============================================

/**
 * @route   GET /api/v1/payments/:paymentId
 * @desc    Get payment details
 * @access  Private (Admin)
 */
export const getPaymentDetails = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { paymentId } = req.params;

    const paymentDetails = await paymentService.getPaymentDetails(paymentId);

    res.status(200).json({
      success: true,
      data: paymentDetails,
    });
  }
);

// ============================================
// Initiate Refund
// ============================================

/**
 * @route   POST /api/v1/payments/refund/:orderId
 * @desc    Initiate refund for an order
 * @access  Private (Admin)
 */
export const initiateRefund = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { orderId } = req.params;
    const { amount } = req.body;

    const refund = await paymentService.initiateRefund(orderId, amount);

    res.status(200).json({
      success: true,
      message: 'Refund initiated successfully',
      data: refund,
    });
  }
);

// ============================================
// Get Supported Payment Methods
// ============================================

/**
 * @route   GET /api/v1/payments/methods
 * @desc    Get all supported payment methods
 * @access  Public
 */
export const getSupportedMethods = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const methods = paymentService.getSupportedPaymentMethods();

    res.status(200).json({
      success: true,
      data: {
        methods,
        description: {
          upi: 'UPI (Google Pay, PhonePe, Paytm, BHIM, etc.)',
          card: 'Credit/Debit Cards (Visa, Mastercard, RuPay)',
          netbanking: 'Net Banking (All major banks)',
          wallet: 'Wallets (Paytm, PhonePe, Amazon Pay, etc.)',
          emi: 'EMI (Card EMI, Bajaj Finserv, etc.)',
          paylater: 'Pay Later (Simpl, LazyPay, etc.)',
        },
      },
    });
  }
);

// ============================================
// Initiate Enrollment Payment
// ============================================

/**
 * @route   POST /api/v1/payments/enrollment/initiate
 * @desc    Initiate payment for program enrollment
 * @access  Private
 */
export const initiateEnrollmentPayment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req as any).user?.id;
    const { programId, customerName, customerEmail, customerPhone } = req.body;

    if (!programId) {
      res.status(400).json({
        success: false,
        message: 'Program ID is required',
      });
      return;
    }

    const result = await paymentService.initiateEnrollmentPayment({
      userId,
      programId,
      customerName: customerName || (req as any).user?.firstName,
      customerEmail: customerEmail || (req as any).user?.email,
      customerPhone: customerPhone || (req as any).user?.phone,
    });

    res.status(200).json({
      success: true,
      message: 'Enrollment payment initiated successfully',
      data: {
        programId: result.program.id,
        programName: result.program.name,
        amount: result.program.discountPrice ? Number(result.program.discountPrice) : Number(result.program.price),
        originalPrice: Number(result.program.price),
        currency: 'INR',
        razorpayOrderId: result.razorpayOrder.id,
        razorpayKeyId: result.keyId,
        enrollmentOrderId: result.enrollmentOrderId,
        customerName: result.razorpayOrder.notes?.customerEmail ? customerName : (req as any).user?.firstName,
        customerEmail: customerEmail || (req as any).user?.email,
        customerPhone: customerPhone || (req as any).user?.phone,
      },
    });
  }
);

// ============================================
// Verify Enrollment Payment
// ============================================

/**
 * @route   POST /api/v1/payments/enrollment/verify
 * @desc    Verify enrollment payment and create enrollment
 * @access  Private
 */
export const verifyEnrollmentPayment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req as any).user?.id;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      programId,
    } = req.body;

    const result = await paymentService.verifyEnrollmentPayment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      userId,
      programId,
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified and enrollment created successfully',
      data: {
        enrollment: result.enrollment,
        paymentMethod: result.paymentDetails.method,
      },
    });
  }
);

