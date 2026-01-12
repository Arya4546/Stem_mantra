import Razorpay from 'razorpay';
import crypto from 'crypto';
import prisma from '../config/database';
import config from '../config';
import logger from '../utils/logger';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { PaymentStatus, OrderStatus } from '@prisma/client';

// Initialize Razorpay instance lazily to avoid startup errors when keys are not configured
let razorpay: Razorpay | null = null;

const getRazorpay = (): Razorpay => {
  if (!razorpay) {
    if (!config.razorpay.keyId || !config.razorpay.keySecret) {
      throw new BadRequestError('Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
    }
    razorpay = new Razorpay({
      key_id: config.razorpay.keyId,
      key_secret: config.razorpay.keySecret,
    });
  }
  return razorpay;
};

// ============================================
// Interfaces
// ============================================

export interface CreateOrderParams {
  amount: number; // Amount in INR (will be converted to paise)
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface VerifyPaymentParams {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  orderId: string;
}

export interface PaymentDetails {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  description?: string;
  bank?: string;
  wallet?: string;
  vpa?: string; // UPI VPA
  email: string;
  contact: string;
  fee?: number;
  tax?: number;
  error_code?: string;
  error_description?: string;
  created_at: number;
}

// ============================================
// Service Class
// ============================================

class PaymentService {
  /**
   * Create a Razorpay order for payment
   */
  async createRazorpayOrder(params: CreateOrderParams): Promise<RazorpayOrder> {
    try {
      // Convert INR to paise (Razorpay expects amount in smallest currency unit)
      const amountInPaise = Math.round(params.amount * 100);

      const options = {
        amount: amountInPaise,
        currency: params.currency || 'INR',
        receipt: params.receipt,
        notes: params.notes || {},
      };

      logger.info('Creating Razorpay order:', { receipt: params.receipt, amount: params.amount });
      
      const order = await getRazorpay().orders.create(options);
      
      logger.info('Razorpay order created:', { orderId: order.id });
      
      return order as RazorpayOrder;
    } catch (error) {
      logger.error('Failed to create Razorpay order:', error);
      throw new BadRequestError('Failed to create payment order. Please try again.');
    }
  }

  /**
   * Create order and initiate payment
   */
  async initiatePayment(orderId: string): Promise<{
    razorpayOrder: RazorpayOrder;
    order: any;
    keyId: string;
  }> {
    // Find the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      throw new BadRequestError('Order is already paid');
    }

    // Create Razorpay order
    const razorpayOrder = await this.createRazorpayOrder({
      amount: Number(order.total),
      receipt: order.orderNumber,
      notes: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerEmail: order.customerEmail,
      },
    });

    // Update order with Razorpay order ID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId: razorpayOrder.id,
        paymentMethod: 'razorpay',
      },
    });

    return {
      razorpayOrder,
      order,
      keyId: config.razorpay.keyId,
    };
  }

  /**
   * Verify payment signature from Razorpay
   */
  verifyPaymentSignature(params: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): boolean {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = params;

    // Create the expected signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(body)
      .digest('hex');

    return expectedSignature === razorpaySignature;
  }

  /**
   * Verify and confirm payment
   */
  async verifyPayment(params: VerifyPaymentParams): Promise<any> {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = params;

    // Find the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Verify signature
    const isValid = this.verifyPaymentSignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!isValid) {
      // Update order status to failed
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.FAILED,
        },
      });
      throw new BadRequestError('Payment verification failed. Invalid signature.');
    }

    // Fetch payment details from Razorpay
    const paymentDetails = await this.getPaymentDetails(razorpayPaymentId);

    // Update order with payment confirmation
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.PAID,
        paymentId: razorpayPaymentId,
        paymentMethod: paymentDetails.method || 'razorpay',
        status: OrderStatus.CONFIRMED,
      },
      include: { items: true },
    });

    logger.info('Payment verified successfully:', {
      orderId,
      paymentId: razorpayPaymentId,
      method: paymentDetails.method,
    });

    return {
      success: true,
      order: updatedOrder,
      paymentDetails,
    };
  }

  /**
   * Get payment details from Razorpay
   */
  async getPaymentDetails(paymentId: string): Promise<PaymentDetails> {
    try {
      const payment = await getRazorpay().payments.fetch(paymentId);
      return payment as unknown as PaymentDetails;
    } catch (error) {
      logger.error('Failed to fetch payment details:', error);
      throw new BadRequestError('Failed to fetch payment details');
    }
  }

  /**
   * Handle Razorpay webhook events
   */
  async handleWebhook(payload: any, signature: string): Promise<void> {
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (expectedSignature !== signature) {
      logger.warn('Invalid webhook signature');
      throw new BadRequestError('Invalid webhook signature');
    }

    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;

    logger.info('Webhook event received:', { event });

    switch (event) {
      case 'payment.captured':
        await this.handlePaymentCaptured(paymentEntity);
        break;
      case 'payment.failed':
        await this.handlePaymentFailed(paymentEntity);
        break;
      case 'order.paid':
        await this.handleOrderPaid(payload.payload?.order?.entity);
        break;
      case 'refund.created':
        await this.handleRefundCreated(payload.payload?.refund?.entity);
        break;
      default:
        logger.info('Unhandled webhook event:', { event });
    }
  }

  /**
   * Handle payment captured webhook
   */
  private async handlePaymentCaptured(payment: any): Promise<void> {
    const orderId = payment.notes?.orderId;
    if (!orderId) return;

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.PAID,
        paymentId: payment.id,
        status: OrderStatus.CONFIRMED,
      },
    });

    logger.info('Payment captured via webhook:', { orderId, paymentId: payment.id });
  }

  /**
   * Handle payment failed webhook
   */
  private async handlePaymentFailed(payment: any): Promise<void> {
    const orderId = payment.notes?.orderId;
    if (!orderId) return;

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.FAILED,
      },
    });

    logger.info('Payment failed via webhook:', {
      orderId,
      error: payment.error_description,
    });
  }

  /**
   * Handle order paid webhook
   */
  private async handleOrderPaid(order: any): Promise<void> {
    const orderId = order.notes?.orderId;
    if (!orderId) return;

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.PAID,
        status: OrderStatus.CONFIRMED,
      },
    });

    logger.info('Order paid via webhook:', { orderId });
  }

  /**
   * Handle refund created webhook
   */
  private async handleRefundCreated(refund: any): Promise<void> {
    const paymentId = refund.payment_id;
    
    // Find order by payment ID
    const order = await prisma.order.findFirst({
      where: { paymentId },
    });

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: PaymentStatus.REFUNDED,
          status: OrderStatus.REFUNDED,
        },
      });

      logger.info('Refund processed via webhook:', { orderId: order.id, refundId: refund.id });
    }
  }

  /**
   * Initiate refund for an order
   */
  async initiateRefund(orderId: string, amount?: number): Promise<any> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (!order.paymentId) {
      throw new BadRequestError('No payment found for this order');
    }

    if (order.paymentStatus !== PaymentStatus.PAID) {
      throw new BadRequestError('Order payment is not in paid status');
    }

    try {
      const refundAmount = amount ? Math.round(amount * 100) : Math.round(Number(order.total) * 100);
      
      const refund = await getRazorpay().payments.refund(order.paymentId, {
        amount: refundAmount,
        notes: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          reason: 'Customer requested refund',
        },
      });

      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.REFUNDED,
          status: OrderStatus.REFUNDED,
        },
      });

      logger.info('Refund initiated:', { orderId, refundId: refund.id });

      return refund;
    } catch (error) {
      logger.error('Failed to initiate refund:', error);
      throw new BadRequestError('Failed to initiate refund. Please try again.');
    }
  }

  /**
   * Get all supported payment methods
   */
  getSupportedPaymentMethods(): string[] {
    return [
      'upi',          // UPI (Google Pay, PhonePe, Paytm, etc.)
      'card',         // Credit/Debit Cards
      'netbanking',   // Net Banking
      'wallet',       // Wallets (Paytm, PhonePe, etc.)
      'emi',          // EMI
      'paylater',     // Pay Later (Simpl, LazyPay, etc.)
    ];
  }

  /**
   * Create payment order for program enrollment
   */
  async initiateEnrollmentPayment(params: {
    userId: string;
    programId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }): Promise<{
    razorpayOrder: RazorpayOrder;
    program: any;
    keyId: string;
    enrollmentOrderId: string;
  }> {
    const { userId, programId, customerEmail } = params;

    // Find the program
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      throw new NotFoundError('Program not found');
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_programId: { userId, programId },
      },
    });

    if (existingEnrollment) {
      throw new BadRequestError('You are already enrolled in this program');
    }

    // Calculate price
    const price = program.discountPrice ? Number(program.discountPrice) : Number(program.price);
    
    if (price <= 0) {
      throw new BadRequestError('This program is free. Please enroll directly.');
    }

    // Generate a unique order ID for enrollment
    const enrollmentOrderId = `ENR-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Create Razorpay order
    const razorpayOrder = await this.createRazorpayOrder({
      amount: price,
      receipt: enrollmentOrderId,
      notes: {
        type: 'enrollment',
        userId,
        programId,
        programName: program.name,
        customerEmail,
        enrollmentOrderId,
      },
    });

    logger.info('Enrollment payment initiated:', { enrollmentOrderId, programId, userId });

    return {
      razorpayOrder,
      program,
      keyId: config.razorpay.keyId,
      enrollmentOrderId,
    };
  }

  /**
   * Verify enrollment payment and create enrollment
   */
  async verifyEnrollmentPayment(params: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    userId: string;
    programId: string;
  }): Promise<any> {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, userId, programId } = params;

    // Verify signature
    const isValid = this.verifyPaymentSignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!isValid) {
      logger.error('Enrollment payment verification failed: Invalid signature');
      throw new BadRequestError('Payment verification failed. Invalid signature.');
    }
       
    // Fetch payment details
    const paymentDetails = await this.getPaymentDetails(razorpayPaymentId);

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        programId,
        status: 'enrolled',
        progress: 0,
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
            thumbnail: true,
          },
        },
      },
    });

    logger.info('Enrollment created after payment:', {
      enrollmentId: enrollment.id,
      paymentId: razorpayPaymentId,
      method: paymentDetails.method,
    });

    return {
      success: true,
      enrollment,
      paymentDetails,
    };
  }
}

export const paymentService = new PaymentService();
export default paymentService;
