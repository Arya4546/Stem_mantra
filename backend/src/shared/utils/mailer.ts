import nodemailer from 'nodemailer';
import { env } from '../../config/env';
import { logger } from '../../config/logger';

const smtpConfigured = Boolean(env.SMTP_USER && env.SMTP_PASS);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      requireTLS: env.SMTP_PORT !== 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
    })
  : null;

export interface MailInput {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: { name: string; address: string };
}

export type MailResult = 'SENT' | 'FAILED' | 'SKIPPED';

/** Never throws: a mail outage must not lose the enquiry (it is already saved in the DB). */
export async function sendMail(input: MailInput): Promise<MailResult> {
  if (!transporter) {
    logger.warn(`Email "${input.subject}" not sent: SMTP_USER / SMTP_PASS are not configured`);
    return 'SKIPPED';
  }
  try {
    const info = await transporter.sendMail({
      from: { name: env.MAIL_FROM_NAME, address: env.MAIL_FROM_EMAIL },
      to: input.to,
      replyTo: input.replyTo,
      subject: input.subject.replace(/[\r\n]+/g, ' ').slice(0, 200),
      html: input.html,
      text: input.text,
    });
    logger.info(`Email sent: ${input.subject}`, { messageId: info.messageId, to: input.to });
    return 'SENT';
  } catch (err) {
    logger.error(`Email failed: ${input.subject}`, { error: (err as Error).message });
    return 'FAILED';
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
