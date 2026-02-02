import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler';
import authService from '../services/auth.service';
import { sendSuccess, sendCreated } from '../utils/response';

// ============ OTP-BASED AUTHENTICATION ============

export const sendRegistrationOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email, firstName, lastName } = req.body;

  const result = await authService.sendRegistrationOTP(email, firstName, lastName);

  return sendSuccess(res, result, 'OTP sent successfully. Please check your email.');
});

export const verifyRegistrationOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp, firstName, lastName, phone, password } = req.body;

  const result = await authService.verifyRegistrationOTP(email, otp, {
    firstName,
    lastName,
    phone,
    password,
  });

  // Set refresh token as HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return sendCreated(res, {
    user: result.user,
    accessToken: result.accessToken,
  }, 'Registration successful! Welcome to STEMmantra.');
});

export const requestLoginOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await authService.requestLoginOTP(email);

  return sendSuccess(res, result, 'OTP sent successfully. Please check your email.');
});

export const verifyLoginOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const result = await authService.verifyLoginOTP(email, otp);

  // Set refresh token as HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return sendSuccess(res, {
    user: result.user,
    accessToken: result.accessToken,
  }, 'Login successful!');
});

export const requestPasswordReset = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await authService.requestPasswordReset(email);

  return sendSuccess(res, result, result.message);
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  const result = await authService.resetPassword(email, otp, newPassword);

  return sendSuccess(res, result, result.message);
});

// ============ TRADITIONAL AUTHENTICATION ============

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phone, role, schoolId } = req.body;

  const result = await authService.register({
    email,
    password,
    firstName,
    lastName,
    phone,
    role,
    schoolId,
  });

  // Set refresh token as HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return sendCreated(res, {
    user: result.user,
    accessToken: result.accessToken,
  }, 'Registration successful');
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  // Set refresh token as HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return sendSuccess(res, {
    user: result.user,
    accessToken: result.accessToken,
  }, 'Login successful');
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  // Try to get refresh token from cookie first, then from body
  const token = req.cookies?.refreshToken || req.body.refreshToken;

  const result = await authService.refreshToken(token);

  // Set new refresh token as HTTP-only cookie
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return sendSuccess(res, { accessToken: result.accessToken }, 'Token refreshed successfully');
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const token = req.cookies?.refreshToken || req.body.refreshToken;

  // Clear the refresh token cookie
  res.clearCookie('refreshToken');

  if (!userId) {
    return sendSuccess(res, null, 'Logged out');
  }

  const result = await authService.logout(userId, token);

  return sendSuccess(res, result, result.message);
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return sendSuccess(res, null, 'No user found');
  }

  const user = await authService.getProfile(userId);

  return sendSuccess(res, user, 'Profile retrieved successfully');
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return sendSuccess(res, null, 'No user found');
  }

  const { firstName, lastName, phone, avatar } = req.body;

  const user = await authService.updateProfile(userId, { firstName, lastName, phone, avatar });

  return sendSuccess(res, user, 'Profile updated successfully');
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return sendSuccess(res, null, 'No user found');
  }

  const result = await authService.changePassword(userId, currentPassword, newPassword);

  return sendSuccess(res, result, result.message);
});
