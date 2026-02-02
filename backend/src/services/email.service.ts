import * as SibApiV3Sdk from '@sendinblue/client';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import config from '../config';
import logger from '../utils/logger';

// Initialize Brevo API client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, config.brevo.apiKey);

interface EmailOptions {
  to: string | string[];
  subject: string;
  template: string;
  data: OTPEmailData | WelcomeEmailData | OrderEmailData | ContactEmailData | Record<string, unknown>;
  attachments?: Array<{
    name: string;
    content: string;
  }>;
}

interface OTPEmailData {
  name: string;
  otp: string;
  expiryMinutes: number;
  purpose: 'verification' | 'login' | 'reset-password';
  [key: string]: unknown;
}

interface WelcomeEmailData {
  name: string;
  email: string;
  loginUrl: string;
  [key: string]: unknown;
}

interface OrderEmailData {
  name: string;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  orderDate: string;
  orderUrl: string;
  [key: string]: unknown;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  [key: string]: unknown;
}

class EmailService {
  private templatesDir: string;
  private templatesCache: Map<string, string> = new Map();

  constructor() {
    this.templatesDir = path.join(__dirname, '../templates/emails');
    this.ensureTemplatesDirectory();
  }

  private ensureTemplatesDirectory(): void {
    if (!fs.existsSync(this.templatesDir)) {
      fs.mkdirSync(this.templatesDir, { recursive: true });
    }
  }

  private async getTemplate(templateName: string): Promise<string> {
    // Check cache first
    if (this.templatesCache.has(templateName)) {
      return this.templatesCache.get(templateName)!;
    }

    const templatePath = path.join(this.templatesDir, `${templateName}.ejs`);

    if (!fs.existsSync(templatePath)) {
      // Return a default template if specific one doesn't exist
      return this.getDefaultTemplate(templateName);
    }

    const template = fs.readFileSync(templatePath, 'utf-8');
    this.templatesCache.set(templateName, template);
    return template;
  }

  private getDefaultTemplate(templateName: string): string {
    // Fallback templates for development
    const templates: Record<string, string> = {
      'otp': `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code - STEMmantra</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 320px;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">STEMmantra</h1>
              <p style="margin: 10px 0 0; font-size: 14px; color: rgba(255,255,255,0.8);">Empowering Future Innovators</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a2e;">Hello <%= name %>,</h2>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #4a5568;">
                <% if (purpose === 'verification') { %>
                  Please use the following OTP to verify your email address:
                <% } else if (purpose === 'login') { %>
                  Your one-time login code is ready:
                <% } else { %>
                  Use this OTP to reset your password:
                <% } %>
              </p>
              <!-- OTP Box -->
              <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; padding: 20px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
                  <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #ffffff;"><%= otp %></span>
                </div>
              </div>
              <p style="margin: 30px 0 0; font-size: 14px; color: #718096; text-align: center;">
                This code will expire in <strong><%= expiryMinutes %> minutes</strong>
              </p>
              <p style="margin: 20px 0 0; font-size: 14px; color: #718096; text-align: center;">
                If you didn't request this code, please ignore this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a0aec0;">
                © <%= new Date().getFullYear() %> STEMmantra. All rights reserved.
              </p>
              <p style="margin: 10px 0 0; font-size: 12px; color: #a0aec0;">
                C-104 2nd Floor, Noida Sec-10, UP - 201301
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      'welcome': `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to STEMmantra</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 320px;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">Welcome to STEMmantra!</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a2e;">Hello <%= name %>,</h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Welcome to STEMmantra! We're thrilled to have you join our community of future innovators and tech enthusiasts.
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Your account has been successfully created with the email: <strong><%= email %></strong>
              </p>
              <div style="text-align: center;">
                <a href="<%= loginUrl %>" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                  Get Started
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a0aec0;">
                © <%= new Date().getFullYear() %> STEMmantra. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      'order-confirmation': `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - STEMmantra</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px 16px 0 0;">
              <div style="width: 60px; height: 60px; margin: 0 auto 15px; background: rgba(255,255,255,0.2); border-radius: 50%; line-height: 60px;">
                <span style="font-size: 30px;">✓</span>
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">Order Confirmed!</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #4a5568;">Hi <%= name %>,</p>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Thank you for your order! We've received your order and will process it soon.
              </p>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <p style="margin: 0 0 10px; font-size: 14px; color: #718096;">Order Number</p>
                <p style="margin: 0; font-size: 20px; font-weight: 600; color: #1a1a2e;"><%= orderNumber %></p>
              </div>
              <!-- Order Items -->
              <table width="100%" cellspacing="0" cellpadding="10" style="border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <th style="text-align: left; font-size: 14px; color: #718096; padding-bottom: 15px;">Item</th>
                  <th style="text-align: center; font-size: 14px; color: #718096; padding-bottom: 15px;">Qty</th>
                  <th style="text-align: right; font-size: 14px; color: #718096; padding-bottom: 15px;">Price</th>
                </tr>
                <% items.forEach(function(item) { %>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 15px 0; font-size: 14px; color: #1a1a2e;"><%= item.name %></td>
                  <td style="padding: 15px 0; font-size: 14px; color: #4a5568; text-align: center;"><%= item.quantity %></td>
                  <td style="padding: 15px 0; font-size: 14px; color: #1a1a2e; text-align: right;">₹<%= item.price.toLocaleString() %></td>
                </tr>
                <% }); %>
                <tr>
                  <td colspan="2" style="padding: 20px 0; font-size: 16px; font-weight: 600; color: #1a1a2e;">Total</td>
                  <td style="padding: 20px 0; font-size: 18px; font-weight: 700; color: #667eea; text-align: right;">₹<%= total.toLocaleString() %></td>
                </tr>
              </table>
              <div style="text-align: center; margin-top: 30px;">
                <a href="<%= orderUrl %>" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px;">
                  View Order Details
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a0aec0;">
                © <%= new Date().getFullYear() %> STEMmantra. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      'contact-notification': `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 30px;">
    <h2 style="color: #1a1a2e; margin-bottom: 20px;">New Contact Form Submission</h2>
    <table width="100%" cellspacing="0" cellpadding="10">
      <tr><td style="color: #718096;"><strong>Name:</strong></td><td><%= name %></td></tr>
      <tr><td style="color: #718096;"><strong>Email:</strong></td><td><a href="mailto:<%= email %>"><%= email %></a></td></tr>
      <% if (phone) { %><tr><td style="color: #718096;"><strong>Phone:</strong></td><td><%= phone %></td></tr><% } %>
      <tr><td style="color: #718096;"><strong>Subject:</strong></td><td><%= subject %></td></tr>
    </table>
    <div style="margin-top: 20px; padding: 20px; background: #f8fafc; border-radius: 8px;">
      <p style="color: #718096; margin: 0 0 10px;"><strong>Message:</strong></p>
      <p style="color: #1a1a2e; margin: 0; white-space: pre-wrap;"><%= message %></p>
    </div>
  </div>
</body>
</html>
      `
    };

    return templates[templateName] || templates['otp'];
  }

  private async renderTemplate(templateName: string, data: Record<string, unknown>): Promise<string> {
    const template = await this.getTemplate(templateName);
    return ejs.render(template, data);
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const htmlContent = await this.renderTemplate(options.template, options.data);

      const toEmails = Array.isArray(options.to)
        ? options.to.map(email => ({ email }))
        : [{ email: options.to }];

      const sendSmtpEmail: SibApiV3Sdk.SendSmtpEmail = {
        sender: {
          name: config.brevo.senderName,
          email: config.brevo.senderEmail,
        },
        to: toEmails,
        subject: options.subject,
        htmlContent,
      };

      if (options.attachments && options.attachments.length > 0) {
        sendSmtpEmail.attachment = options.attachments;
      }

      // In development, log email instead of sending if Brevo is not configured
      if (!config.brevo.apiKey && config.nodeEnv === 'development') {
        logger.info('Email (dev mode - not sent):', {
          to: options.to,
          subject: options.subject,
          template: options.template,
          data: options.data,
        });
        return true;
      }

      await apiInstance.sendTransacEmail(sendSmtpEmail);

      logger.info('Email sent successfully:', {
        to: options.to,
        subject: options.subject,
        template: options.template,
      });

      return true;
    } catch (error) {
      logger.error('Failed to send email:', error);
      // Don't throw in development mode
      if (config.nodeEnv === 'development') {
        return true;
      }
      throw error;
    }
  }

  // Convenience methods for specific email types
  async sendOTP(email: string, data: OTPEmailData): Promise<boolean> {
    const subjectMap = {
      'verification': 'Verify Your Email - STEMmantra',
      'login': 'Your Login OTP - STEMmantra',
      'reset-password': 'Reset Your Password - STEMmantra',
    };

    return this.sendEmail({
      to: email,
      subject: subjectMap[data.purpose],
      template: 'otp',
      data,
    });
  }

  async sendWelcome(email: string, data: WelcomeEmailData): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Welcome to STEMmantra!',
      template: 'welcome',
      data,
    });
  }

  async sendOrderConfirmation(email: string, data: OrderEmailData): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `Order Confirmed - ${data.orderNumber}`,
      template: 'order-confirmation',
      data,
    });
  }

  async sendContactNotification(data: ContactEmailData): Promise<boolean> {
    return this.sendEmail({
      to: config.admin.email,
      subject: `New Contact: ${data.subject}`,
      template: 'contact-notification',
      data,
    });
  }
}

export const emailService = new EmailService();
export default emailService;
