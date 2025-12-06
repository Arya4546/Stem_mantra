import { body, param, query } from 'express-validator';

// ============ ORDERS ============

export const createOrderValidator = [
  body('shippingAddress')
    .isObject().withMessage('Shipping address is required'),
  body('shippingAddress.street')
    .trim()
    .notEmpty().withMessage('Street address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty().withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty().withMessage('State is required'),
  body('shippingAddress.postalCode')
    .trim()
    .notEmpty().withMessage('Postal code is required'),
  body('shippingAddress.country')
    .optional()
    .trim(),
  body('billingAddress')
    .optional()
    .isObject().withMessage('Billing address must be an object'),
  body('paymentMethod')
    .optional()
    .isIn(['COD', 'ONLINE', 'BANK_TRANSFER', 'UPI']).withMessage('Invalid payment method'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Notes must be less than 1000 characters'),
];

export const updateOrderStatusValidator = [
  param('id')
    .isUUID().withMessage('Invalid order ID'),
  body('status')
    .isIn(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'])
    .withMessage('Invalid order status'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes must be less than 500 characters'),
];

export const updatePaymentStatusValidator = [
  param('id')
    .isUUID().withMessage('Invalid order ID'),
  body('paymentStatus')
    .isIn(['PENDING', 'PAID', 'FAILED', 'REFUNDED'])
    .withMessage('Invalid payment status'),
  body('transactionId')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Transaction ID must be less than 200 characters'),
];

export const cancelOrderValidator = [
  param('id')
    .isUUID().withMessage('Invalid order ID'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Reason must be less than 500 characters'),
];

export const trackOrderValidator = [
  param('orderNumber')
    .trim()
    .notEmpty().withMessage('Order number is required'),
  query('email')
    .isEmail().withMessage('Valid email is required for order tracking'),
];

// ============ QUERY VALIDATORS ============

export const orderQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'])
    .withMessage('Invalid status filter'),
  query('paymentStatus')
    .optional()
    .isIn(['PENDING', 'PAID', 'FAILED', 'REFUNDED'])
    .withMessage('Invalid payment status filter'),
  query('userId')
    .optional()
    .isUUID().withMessage('Invalid user ID'),
  query('dateFrom')
    .optional()
    .isISO8601().withMessage('Invalid date format for dateFrom'),
  query('dateTo')
    .optional()
    .isISO8601().withMessage('Invalid date format for dateTo'),
];
