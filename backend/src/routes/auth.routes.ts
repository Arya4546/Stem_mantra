import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth';
import { authLimiter, otpLimiter } from '../middlewares/rateLimiter';
import validate from '../middlewares/validate';
import {
  registerValidation,
  loginValidation,
  refreshTokenValidation,
  changePasswordValidation,
  emailValidation,
  otpValidation,
  resetPasswordValidation,
} from '../validators/auth.validator';

const router = Router();

// ============ OTP-BASED AUTHENTICATION ============

/**
 * @route   POST /api/v1/auth/otp/register/send
 * @desc    Send OTP for registration
 * @access  Public
 */
router.post(
  '/otp/register/send',
  otpLimiter,
  validate(emailValidation),
  authController.sendRegistrationOTP
);

/**
 * @route   POST /api/v1/auth/otp/register/verify
 * @desc    Verify OTP and complete registration
 * @access  Public
 */
router.post(
  '/otp/register/verify',
  otpLimiter,
  validate(otpValidation),
  authController.verifyRegistrationOTP
);

/**
 * @route   POST /api/v1/auth/otp/login/send
 * @desc    Send OTP for login
 * @access  Public
 */
router.post(
  '/otp/login/send',
  otpLimiter,
  validate(emailValidation),
  authController.requestLoginOTP
);

/**
 * @route   POST /api/v1/auth/otp/login/verify
 * @desc    Verify OTP and complete login
 * @access  Public
 */
router.post(
  '/otp/login/verify',
  otpLimiter,
  validate(otpValidation),
  authController.verifyLoginOTP
);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Request password reset OTP
 * @access  Public
 */
router.post(
  '/forgot-password',
  otpLimiter,
  validate(emailValidation),
  authController.requestPasswordReset
);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password with OTP
 * @access  Public
 */
router.post(
  '/reset-password',
  otpLimiter,
  validate(resetPasswordValidation),
  authController.resetPassword
);

// ============ TRADITIONAL AUTHENTICATION ============

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  authLimiter,
  validate(registerValidation),
  authController.register
);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  '/login',
  authLimiter,
  validate(loginValidation),
  authController.login
);

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
  '/refresh-token',
  validate(refreshTokenValidation),
  authController.refreshToken
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticate, authController.logout);

/**
 * @route   GET /api/v1/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticate, authController.getProfile);

/**
 * @route   PUT /api/v1/auth/profile
 * @desc    Update current user profile
 * @access  Private
 */
router.put('/profile', authenticate, authController.updateProfile);

/**
 * @route   PATCH /api/v1/auth/profile
 * @desc    Update current user profile (partial)
 * @access  Private
 */
router.patch('/profile', authenticate, authController.updateProfile);

/**
 * @route   PUT /api/v1/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put(
  '/change-password',
  authenticate,
  validate(changePasswordValidation),
  authController.changePassword
);

export default router;
