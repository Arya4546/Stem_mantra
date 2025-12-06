import rateLimit from 'express-rate-limit';
import config from '../config';

// General rate limiter
export const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // 15 minutes
  max: config.rateLimit.maxRequests, // 100 requests per window
  message: {
    success: false,
    message: 'Too many requests, please try again later',
    code: 'TOO_MANY_REQUESTS',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes',
    code: 'TOO_MANY_LOGIN_ATTEMPTS',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Rate limiter for contact form submissions
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour
  message: {
    success: false,
    message: 'Too many contact form submissions, please try again later',
    code: 'TOO_MANY_SUBMISSIONS',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for newsletter subscriptions
export const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 subscriptions per hour
  message: {
    success: false,
    message: 'Too many subscription attempts, please try again later',
    code: 'TOO_MANY_SUBSCRIPTIONS',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for OTP requests (stricter)
export const otpLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 OTP requests per minute
  message: {
    success: false,
    message: 'Too many OTP requests. Please wait before requesting again.',
    code: 'TOO_MANY_OTP_REQUESTS',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for file uploads
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 uploads per hour
  message: {
    success: false,
    message: 'Too many uploads. Please try again later.',
    code: 'TOO_MANY_UPLOADS',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for API endpoints (generous)
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: {
    success: false,
    message: 'Rate limit exceeded. Please slow down.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
