import { Request, Response, NextFunction } from 'express';
import orderService from '../services/order.service';
import { asyncHandler, sendSuccess, sendPaginated, sendCreated } from '../utils/response';
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/errors';
import { OrderStatus, PaymentStatus } from '@prisma/client';

// ============ ORDERS ============

export const createOrderFromCart = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  
  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }
  
  const { shippingAddress, billingAddress, paymentMethod, notes, cartId, customerName, customerEmail, customerPhone } = req.body;
  
  if (!shippingAddress) {
    throw new BadRequestError('Shipping address is required');
  }
  
  const order = await orderService.createOrder({
    cartId,
    customerName: customerName || (req as any).user?.name,
    customerEmail: customerEmail || (req as any).user?.email,
    customerPhone: customerPhone || (req as any).user?.phone,
    shippingAddress,
    billingAddress: billingAddress || shippingAddress,
    paymentMethod: paymentMethod || 'COD',
    notes
  });
  
  sendCreated(res, order, 'Order created successfully');
});

export const getOrderById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const userId = (req as any).user?.id;
  const isAdmin = (req as any).user?.role === 'ADMIN';
  
  const order = await orderService.getOrderById(id);
  
  if (!order) {
    throw new NotFoundError('Order not found');
  }
  
  // Check if user is authorized to view this order
  if (!isAdmin && order.userId !== userId) {
    throw new ForbiddenError('You are not authorized to view this order');
  }
  
  sendSuccess(res, order, 'Order fetched successfully');
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = (req as any).user?.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  if (!userId) {
    throw new BadRequestError('User not authenticated');
  }
  
  const result = await orderService.getUserOrders(userId, page, limit);
  sendPaginated(res, result.orders, page, limit, result.meta.total, 'Orders fetched successfully');
});

export const getAllOrders = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const status = req.query.status as OrderStatus | undefined;
  const paymentStatus = req.query.paymentStatus as PaymentStatus | undefined;
  const search = req.query.search as string;
  const dateFrom = req.query.dateFrom as string;
  const dateTo = req.query.dateTo as string;
  
  const result = await orderService.getAllOrders({ 
    page, 
    limit, 
    status, 
    paymentStatus, 
    search,
    startDate: dateFrom ? new Date(dateFrom) : undefined,
    endDate: dateTo ? new Date(dateTo) : undefined
  });
  
  sendPaginated(res, result.orders, page, limit, result.meta.total, 'Orders fetched successfully');
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];
  
  if (!status || !validStatuses.includes(status)) {
    throw new BadRequestError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }
  
  const order = await orderService.updateOrderStatus(id, status as OrderStatus);
  
  if (!order) {
    throw new NotFoundError('Order not found');
  }
  
  sendSuccess(res, order, 'Order status updated successfully');
});

export const updatePaymentStatus = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const { paymentStatus, transactionId } = req.body;
  
  const validPaymentStatuses = ['PENDING', 'PAID', 'FAILED', 'REFUNDED'];
  
  if (!paymentStatus || !validPaymentStatuses.includes(paymentStatus)) {
    throw new BadRequestError(`Invalid payment status. Must be one of: ${validPaymentStatuses.join(', ')}`);
  }
  
  const order = await orderService.updatePaymentStatus(id, paymentStatus as PaymentStatus, transactionId);
  
  if (!order) {
    throw new NotFoundError('Order not found');
  }
  
  sendSuccess(res, order, 'Payment status updated successfully');
});

export const cancelOrder = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const userId = (req as any).user?.id;
  const isAdmin = (req as any).user?.role === 'ADMIN';
  
  const order = await orderService.getOrderById(id);
  
  if (!order) {
    throw new NotFoundError('Order not found');
  }
  
  // Check if user is authorized to cancel this order
  if (!isAdmin && order.userId !== userId) {
    throw new ForbiddenError('You are not authorized to cancel this order');
  }
  
  // Check if order can be cancelled
  if (['SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'].includes(order.status)) {
    throw new BadRequestError('This order cannot be cancelled');
  }
  
  const cancelledOrder = await orderService.updateOrderStatus(id, 'CANCELLED' as OrderStatus);
  
  sendSuccess(res, cancelledOrder, 'Order cancelled successfully');
});

export const getOrderStats = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const stats = await orderService.getOrderStats();
  sendSuccess(res, stats, 'Order statistics fetched successfully');
});

// Track order by order number (public)
export const trackOrder = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { orderNumber } = req.params;
  const { email } = req.query;
  
  if (!email) {
    throw new BadRequestError('Email is required for order tracking');
  }
  
  const order = await orderService.getOrderByNumber(orderNumber);
  
  if (!order || order.customerEmail !== email) {
    throw new NotFoundError('Order not found or email does not match');
  }
  
  // Return limited order info for tracking
  const trackingInfo = {
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    items: order.items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    total: order.total
  };
  
  sendSuccess(res, trackingInfo, 'Order tracking information fetched successfully');
});
