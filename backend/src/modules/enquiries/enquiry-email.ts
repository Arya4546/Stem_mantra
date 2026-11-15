import type { Enquiry } from '@prisma/client';
import { env } from '../../config/env';
import { escapeHtml } from '../../shared/utils/mailer';

export function renderEnquiryEmail(e: Enquiry): { subject: string; html: string; text: string } {
  const label = e.type === 'DEMO' ? 'Demo request' : 'Contact enquiry';
  const subject = `${label} – ${e.organization || e.name}`;

  const rows: Array<[string, string | null]> = [
    ['Name', e.name],
    ['Email', e.email],
    ['Phone', e.phone],
    ['School / Organisation', e.organization],
    ['Interested in', e.interest],
    ['Submitted from', e.sourcePath],
  ];
  const visible = rows.filter((r): r is [string, string] => Boolean(r[1]));
  const adminLink = `${env.SITE_URL.replace(/\/$/, '')}/admin/enquiries?open=${e.id}`;

  const html = `<!doctype html>
<html><body style="margin:0;background:#f8fafc;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden">
    <div style="background:#ea580c;color:#ffffff;padding:18px 24px">
      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:.85">stemmantra.com</div>
      <div style="font-size:20px;font-weight:bold;margin-top:4px">New ${escapeHtml(label.toLowerCase())}</div>
    </div>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${visible
        .map(
          ([k, v]) => `<tr>
        <td style="padding:10px 24px;border-bottom:1px solid #f1f5f9;color:#64748b;width:180px;vertical-align:top">${escapeHtml(k)}</td>
        <td style="padding:10px 24px;border-bottom:1px solid #f1f5f9;font-weight:bold;word-break:break-word">${escapeHtml(v)}</td>
      </tr>`,
        )
        .join('')}
    </table>
    ${
      e.message
        ? `<div style="padding:16px 24px">
      <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Message</div>
      <div style="white-space:pre-wrap;line-height:1.6;font-size:14px;word-break:break-word">${escapeHtml(e.message)}</div>
    </div>`
        : ''
    }
    <div style="padding:16px 24px 24px">
      <a href="${escapeHtml(adminLink)}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:bold">Open in admin panel</a>
      <p style="color:#94a3b8;font-size:12px;margin:16px 0 0">Reply to this email to respond directly to ${escapeHtml(e.name)}.</p>
    </div>
  </div>
</body></html>`;

  const text = [
    `New ${label.toLowerCase()} from stemmantra.com`,
    '',
    ...visible.map(([k, v]) => `${k}: ${v}`),
    ...(e.message ? ['', 'Message:', e.message] : []),
    '',
    `Admin panel: ${adminLink}`,
  ].join('\n');

  return { subject, html, text };
}
