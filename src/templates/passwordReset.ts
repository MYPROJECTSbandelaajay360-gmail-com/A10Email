import { EmailTemplate } from '../types';

export interface PasswordResetTemplateData {
  name?: string;
  resetLink: string;
  expiresAt?: string;
}

import { EXTRAHAND_LOGO_SVG } from './logo';

export const passwordResetTemplate: EmailTemplate = {
  name: 'password_reset',
  subject: 'Reset Your A10 Admin Password',
  html: (data: PasswordResetTemplateData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your A10 Admin Password</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.05);">
          
          <!-- Header Accent -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); height: 6px;"></td>
          </tr>

          <!-- Profile / Logo Area -->
          <tr>
            <td style="padding:40px 40px 30px;text-align:center;">
              <div style="margin-bottom:24px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">Password Reset Request</h1>
              <p style="margin:10px 0 0;font-size:15px;color:#64748b;line-height:1.5;">We received a request to update your account security</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="background:#f1f5f9;border-radius:12px;padding:30px;border:1px solid #e2e8f0;">
                <p style="margin:0 0 16px;color:#1e293b;font-size:16px;line-height:1.6;font-weight:600;">
                  Hello ${data.name || 'Admin User'},
                </p>
                <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">
                  Someone recently requested a password reset for your A10 Admin account. If this was you, please use the button below to set a new password.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center">
                      <a href="${data.resetLink}" style="display:inline-block;background:#2563eb;color:#ffffff !important;text-decoration:none;padding:16px 36px;border-radius:12px;font-weight:700;font-size:16px;box-shadow:0 4px 6px rgba(37, 99, 235, 0.2);transition:all 0.2s ease;">
                        Reset My Password
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0;color:#64748b;font-size:13px;line-height:1.6;text-align:center;">
                  This secure link will expire in 1 hour for your protection.
                </p>
              </div>

              <!-- Manual Link -->
              <div style="margin-top:30px;padding-top:25px;border-top:1px dashed #e2e8f0;">
                <p style="margin:0 0 10px;color:#64748b;font-size:13px;text-align:center;">
                  Can't click the button? Copy and paste this URL into your browser:
                </p>
                <p style="margin:0;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-size:12px;color:#334155;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;word-break:break-all;text-align:center;line-height:1.4;">
                  ${data.resetLink}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:30px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 10px;color:#64748b;font-size:13px;font-weight:600;">
                A10 Admin Portal
              </p>
              <p style="margin:0 0 15px;color:#94a3b8;font-size:12px;line-height:1.6;">
                If you did not request this change, please ignore this email or contact support if you have security concerns.
              </p>
              <p style="margin:0;color:#cbd5e1;font-size:11px;text-transform:uppercase;letter-spacing:1px;">
                © ${new Date().getFullYear()} A10. All rights reserved.
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
  text: (data: PasswordResetTemplateData) => `
Hello ${data.name || 'Admin User'},

We received a request to reset your A10 Admin password.

Use the link below to reset your password (valid for 1 hour):
${data.resetLink}

If you did not make this request, you can safely ignore this email.

© ${new Date().getFullYear()} A10. All rights reserved.
  `,
};
