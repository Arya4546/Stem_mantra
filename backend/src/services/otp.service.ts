import crypto from 'crypto';
import prisma from '../config/database';
import config from '../config';
import { emailService } from './email.service';
import { BadRequestError, TooManyRequestsError } from '../utils/errors';
import logger from '../utils/logger';

interface OTPVerifyResult {
  valid: boolean;
  message: string;
  userId?: string;
}

class OTPService {
  private readonly OTP_LENGTH: number;
  private readonly EXPIRY_MINUTES: number;
  private readonly RESEND_COOLDOWN_SECONDS: number;

  constructor() {
    this.OTP_LENGTH = config.otp.length;
    this.EXPIRY_MINUTES = config.otp.expiryMinutes;
    this.RESEND_COOLDOWN_SECONDS = config.otp.resendCooldownSeconds;
  }

  /**
   * Generate a numeric OTP
   */
  private generateOTP(): string {
    const min = Math.pow(10, this.OTP_LENGTH - 1);
    const max = Math.pow(10, this.OTP_LENGTH) - 1;
    return crypto.randomInt(min, max).toString();
  }

  /**
   * Hash OTP for secure storage
   */
  private hashOTP(otp: string): string {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }

  /**
   * Send OTP for email verification during registration
   */
  async sendVerificationOTP(email: string, name: string): Promise<{ message: string; expiresAt: Date; otp?: string }> {
    // Check cooldown period
    await this.checkCooldown(email, 'VERIFICATION');

    const otp = this.generateOTP();
    const hashedOtp = this.hashOTP(otp);
    const expiresAt = new Date(Date.now() + this.EXPIRY_MINUTES * 60 * 1000);

    // Delete any existing OTPs for this email and purpose
    await prisma.oTP.deleteMany({
      where: {
        identifier: email,
        purpose: 'VERIFICATION',
      },
    });

    // Create new OTP record
    await prisma.oTP.create({
      data: {
        identifier: email,
        code: hashedOtp,
        purpose: 'VERIFICATION',
        expiresAt,
        metadata: { name },
      },
    });

    // Send OTP email
    await emailService.sendOTP(email, {
      name,
      otp,
      expiryMinutes: this.EXPIRY_MINUTES,
      purpose: 'verification',
    });

    logger.info(`Verification OTP sent to ${email}`);

    // In development mode, return the OTP for testing
    const response: { message: string; expiresAt: Date; otp?: string } = {
      message: 'OTP sent successfully. Please check your email.',
      expiresAt,
    };

    if (config.nodeEnv === 'development') {
      response.otp = otp;
      logger.info(`[DEV MODE] OTP for ${email}: ${otp}`);
    }

    return response;
  }

  /**
   * Send OTP for login (passwordless)
   */
  async sendLoginOTP(email: string): Promise<{ message: string; expiresAt: Date; otp?: string }> {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, firstName: true, status: true },
    });

    if (!user) {
      throw new BadRequestError('No account found with this email');
    }

    if (user.status !== 'ACTIVE') {
      throw new BadRequestError('Your account is not active. Please contact support.');
    }

    // Check cooldown period
    await this.checkCooldown(email, 'LOGIN');

    const otp = this.generateOTP();
    const hashedOtp = this.hashOTP(otp);
    const expiresAt = new Date(Date.now() + this.EXPIRY_MINUTES * 60 * 1000);

    // Delete any existing login OTPs for this email
    await prisma.oTP.deleteMany({
      where: {
        identifier: email,
        purpose: 'LOGIN',
      },
    });

    // Create new OTP record
    await prisma.oTP.create({
      data: {
        identifier: email,
        code: hashedOtp,
        purpose: 'LOGIN',
        expiresAt,
        metadata: { userId: user.id },
      },
    });

    // Send OTP email
    await emailService.sendOTP(email, {
      name: user.firstName,
      otp,
      expiryMinutes: this.EXPIRY_MINUTES,
      purpose: 'login',
    });

    logger.info(`Login OTP sent to ${email}`);

    // In development mode, return the OTP for testing
    const response: { message: string; expiresAt: Date; otp?: string } = {
      message: 'OTP sent successfully. Please check your email.',
      expiresAt,
    };

    if (config.nodeEnv === 'development') {
      response.otp = otp;
      logger.info(`[DEV MODE] OTP for ${email}: ${otp}`);
    }

    return response;
  }

  /**
   * Send OTP for password reset
   */
  async sendPasswordResetOTP(email: string): Promise<{ message: string; expiresAt: Date; otp?: string }> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, firstName: true },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      return {
        message: 'If an account exists with this email, you will receive an OTP shortly.',
        expiresAt: new Date(Date.now() + this.EXPIRY_MINUTES * 60 * 1000),
      };
    }

    // Check cooldown period
    await this.checkCooldown(email, 'PASSWORD_RESET');

    const otp = this.generateOTP();
    const hashedOtp = this.hashOTP(otp);
    const expiresAt = new Date(Date.now() + this.EXPIRY_MINUTES * 60 * 1000);

    // Delete any existing reset OTPs for this email
    await prisma.oTP.deleteMany({
      where: {
        identifier: email,
        purpose: 'PASSWORD_RESET',
      },
    });

    // Create new OTP record
    await prisma.oTP.create({
      data: {
        identifier: email,
        code: hashedOtp,
        purpose: 'PASSWORD_RESET',
        expiresAt,
        metadata: { userId: user.id },
      },
    });

    // Send OTP email
    await emailService.sendOTP(email, {
      name: user.firstName,
      otp,
      expiryMinutes: this.EXPIRY_MINUTES,
      purpose: 'reset-password',
    });

    logger.info(`Password reset OTP sent to ${email}`);

    // In development mode, return the OTP for testing
    const response: { message: string; expiresAt: Date; otp?: string } = {
      message: 'If an account exists with this email, you will receive an OTP shortly.',
      expiresAt,
    };

    if (config.nodeEnv === 'development') {
      response.otp = otp;
      logger.info(`[DEV MODE] OTP for ${email}: ${otp}`);
    }

    return response;
  }

  /**
   * Verify an OTP
   */
  async verifyOTP(
    email: string,
    otp: string,
    purpose: 'VERIFICATION' | 'LOGIN' | 'PASSWORD_RESET'
  ): Promise<OTPVerifyResult> {
    const hashedOtp = this.hashOTP(otp);

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        identifier: email,
        purpose,
        code: hashedOtp,
        verified: false,
      },
    });

    if (!otpRecord) {
      // Increment attempts for rate limiting
      await this.incrementAttempts(email, purpose);
      
      return {
        valid: false,
        message: 'Invalid OTP. Please check and try again.',
      };
    }

    // Check if expired
    if (new Date() > otpRecord.expiresAt) {
      await prisma.oTP.delete({ where: { id: otpRecord.id } });
      return {
        valid: false,
        message: 'OTP has expired. Please request a new one.',
      };
    }

    // Mark as verified
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    const metadata = otpRecord.metadata as Record<string, string> | null;

    return {
      valid: true,
      message: 'OTP verified successfully.',
      userId: metadata?.userId,
    };
  }

  /**
   * Check cooldown period before sending new OTP
   */
  private async checkCooldown(email: string, purpose: string): Promise<void> {
    const recentOtp = await prisma.oTP.findFirst({
      where: {
        identifier: email,
        purpose: purpose as 'VERIFICATION' | 'LOGIN' | 'PASSWORD_RESET',
        createdAt: {
          gte: new Date(Date.now() - this.RESEND_COOLDOWN_SECONDS * 1000),
        },
      },
    });

    if (recentOtp) {
      const waitTime = Math.ceil(
        (new Date(recentOtp.createdAt).getTime() + this.RESEND_COOLDOWN_SECONDS * 1000 - Date.now()) / 1000
      );
      throw new TooManyRequestsError(
        `Please wait ${waitTime} seconds before requesting a new OTP.`
      );
    }
  }

  /**
   * Increment failed attempts for rate limiting
   */
  private async incrementAttempts(email: string, purpose: string): Promise<void> {
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        identifier: email,
        purpose: purpose as 'VERIFICATION' | 'LOGIN' | 'PASSWORD_RESET',
        verified: false,
      },
    });

    if (otpRecord) {
      const attempts = (otpRecord.attempts || 0) + 1;
      
      if (attempts >= 5) {
        // Delete OTP after too many attempts
        await prisma.oTP.delete({ where: { id: otpRecord.id } });
        throw new TooManyRequestsError('Too many failed attempts. Please request a new OTP.');
      }

      await prisma.oTP.update({
        where: { id: otpRecord.id },
        data: { attempts },
      });
    }
  }

  /**
   * Cleanup expired OTPs (to be run periodically)
   */
  async cleanupExpiredOTPs(): Promise<number> {
    const result = await prisma.oTP.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    logger.info(`Cleaned up ${result.count} expired OTPs`);
    return result.count;
  }
}

export const otpService = new OTPService();
export default otpService;
