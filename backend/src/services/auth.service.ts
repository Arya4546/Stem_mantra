import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import config from '../config';
import { UnauthorizedError, ConflictError, NotFoundError, BadRequestError } from '../utils/errors';
import { UserRole, UserStatus } from '@prisma/client';
import { otpService } from './otp.service';
import { emailService } from './email.service';

interface RegisterInput {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
  schoolId?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  schoolId?: string | null;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private readonly SALT_ROUNDS = 12;

  /**
   * Step 1: Send OTP for registration
   */
  async sendRegistrationOTP(email: string, firstName: string, _lastName?: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('An account with this email already exists');
    }

    // Send OTP
    return otpService.sendVerificationOTP(email, firstName);
  }

  /**
   * Step 2: Verify OTP and complete registration
   */
  async verifyRegistrationOTP(
    email: string,
    otp: string,
    data: { firstName: string; lastName: string; phone?: string; password?: string }
  ) {
    const verification = await otpService.verifyOTP(email, otp, 'VERIFICATION');

    if (!verification.valid) {
      throw new BadRequestError(verification.message);
    }

    // Create user (password is optional for OTP-only users)
    const hashedPassword = data.password 
      ? await bcrypt.hash(data.password, this.SALT_ROUNDS)
      : null;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        emailVerified: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Send welcome email
    await emailService.sendWelcome(email, {
      name: user.firstName,
      email: user.email,
      loginUrl: `${config.frontendUrl}/login`,
    });

    return { user, ...tokens };
  }

  /**
   * Request OTP for login (passwordless)
   */
  async requestLoginOTP(email: string) {
    return otpService.sendLoginOTP(email);
  }

  /**
   * Verify OTP and complete login
   */
  async verifyLoginOTP(email: string, otp: string) {
    const verification = await otpService.verifyOTP(email, otp, 'LOGIN');

    if (!verification.valid) {
      throw new BadRequestError(verification.message);
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        schoolId: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    });

    return { user, ...tokens };
  }

  /**
   * Request password reset OTP
   */
  async requestPasswordReset(email: string) {
    return otpService.sendPasswordResetOTP(email);
  }

  /**
   * Reset password with OTP
   */
  async resetPassword(email: string, otp: string, newPassword: string) {
    const verification = await otpService.verifyOTP(email, otp, 'PASSWORD_RESET');

    if (!verification.valid) {
      throw new BadRequestError(verification.message);
    }

    const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Invalidate all refresh tokens
    await prisma.refreshToken.deleteMany({
      where: { user: { email } },
    });

    return { message: 'Password reset successfully. Please login with your new password.' };
  }

  async register(input: RegisterInput) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password if provided
    const hashedPassword = input.password 
      ? await bcrypt.hash(input.password, this.SALT_ROUNDS)
      : null;

    // Create user
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        role: input.role || UserRole.USER,
        schoolId: input.schoolId,
        status: UserStatus.PENDING,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, ...tokens };
  }

  async login(input: LoginInput) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.password) {
      throw new BadRequestError('This account uses OTP login. Please use "Login with OTP" instead.');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check user status
    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedError('Your account has been suspended');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedError('Your account is inactive');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    // Find refresh token in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Check if token is expired
    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      throw new UnauthorizedError('Refresh token expired');
    }

    // Delete old refresh token
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });

    // Generate new tokens
    const tokens = await this.generateTokens({
      userId: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
      schoolId: storedToken.user.schoolId,
    });

    return tokens;
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      // Delete specific refresh token
      await prisma.refreshToken.deleteMany({
        where: { userId, token: refreshToken },
      });
    } else {
      // Delete all refresh tokens for user
      await prisma.refreshToken.deleteMany({
        where: { userId },
      });
    }

    return { message: 'Logged out successfully' };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        status: true,
        emailVerified: true,
        school: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.password) {
      throw new BadRequestError('Cannot change password for OTP-only accounts. Please set a password first.');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Invalidate all refresh tokens
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });

    return { message: 'Password changed successfully' };
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName || user.firstName,
        lastName: data.lastName,
        phone: data.phone,
        avatar: data.avatar,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    return updatedUser;
  }

  private async generateTokens(payload: TokenPayload): Promise<AuthTokens> {
    // Generate access token
    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as string,
    } as jwt.SignOptions);

    // Generate refresh token
    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn as string,
    } as jwt.SignOptions);

    // Store refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }
}

export default new AuthService();
