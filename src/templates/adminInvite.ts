import { EmailTemplate } from "../types";

export interface AdminInviteTemplateData {
  role: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  department?: string;
  employeeId?: string;
  salary?: string | number;
  joiningDate?: string;
  reportingManager?: string;
  inviteLink: string;
  expiresAt: Date;
}

export const adminInviteTemplate: EmailTemplate = {
  name: "admin_invite",
  subject: "You're Invited — Complete Your Musterbook HRMS Registration",

  html: (data: AdminInviteTemplateData) => {
    const roleDisplay = data.role ? data.role.charAt(0).toUpperCase() + data.role.slice(1) : 'Employee';
    const expiryDate = new Date(data.expiresAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const joiningDateFormatted = data.joiningDate ? new Date(data.joiningDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) : null;
    const salaryFormatted = data.salary ? `₹${Number(data.salary).toLocaleString('en-IN')}` : null;

    const rows = [
      { label: 'Name', value: `${data.firstName || ''} ${data.lastName || ''}`.trim(), color: '#1e293b' },
      ...(data.employeeId ? [{ label: 'Employee ID', value: data.employeeId, color: '#6366f1', bold: true }] : []),
      { label: 'Designation', value: roleDisplay, color: '#1e293b' },
      ...(data.department ? [{ label: 'Department', value: data.department, color: '#1e293b' }] : []),
      ...(data.phone ? [{ label: 'Phone', value: data.phone, color: '#1e293b' }] : []),
      ...(joiningDateFormatted ? [{ label: 'Joining Date', value: joiningDateFormatted, color: '#1e293b' }] : []),
      ...(salaryFormatted ? [{ label: 'Salary (CTC)', value: salaryFormatted, color: '#059669', bold: true }] : []),
      ...(data.reportingManager ? [{ label: 'Reports To', value: data.reportingManager, color: '#1e293b' }] : []),
    ];

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to Musterbook HRMS</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0" style="background:#eef2f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="480" cellspacing="0" cellpadding="0" style="max-width:480px;width:100%;">

          <!-- Top Brand Header -->
          <tr>
            <td style="padding-bottom:20px;text-align:center;">
              <table cellspacing="0" cellpadding="0" style="margin:0 auto;">
                <tr>
                  <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);border-radius:12px;padding:10px 20px;text-align:center;">
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">M</span>
                    <span style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.85);letter-spacing:1px;text-transform:uppercase;margin-left:4px;">usterbook</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(79,70,229,0.10);">

              <!-- Gradient Banner -->
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 60%,#a855f7 100%);padding:32px 32px 28px;text-align:center;">
                    <!-- Avatar Circle -->
                    <table cellspacing="0" cellpadding="0" style="margin:0 auto 16px;">
                      <tr>
                        <td style="background:rgba(255,255,255,0.15);border-radius:50%;width:64px;height:64px;text-align:center;vertical-align:middle;border:3px solid rgba(255,255,255,0.4);">
                          <span style="font-size:26px;font-weight:700;color:#ffffff;">${(data.firstName || 'U')[0].toUpperCase()}</span>
                        </td>
                      </tr>
                    </table>
                    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;">Welcome, ${data.firstName || 'Team Member'}!</h1>
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.78);line-height:1.5;">You've been invited to join <strong style="color:#fff;">Musterbook HRMS</strong>.<br/>Complete your registration to access your account.</p>
                  </td>
                </tr>
              </table>

              <!-- Details Section -->
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:24px 28px 4px;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Your Details</p>
                    <table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                      ${rows.map((row, i) => `
                      <tr style="background:${i % 2 === 0 ? '#f8fafc' : '#ffffff'};">
                        <td style="padding:11px 16px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;border-bottom:${i < rows.length - 1 ? '1px solid #e2e8f0' : 'none'};">${row.label}</td>
                        <td style="padding:11px 16px;font-size:13px;color:${row.color};font-weight:${(row as any).bold ? '700' : '500'};text-align:right;border-bottom:${i < rows.length - 1 ? '1px solid #e2e8f0' : 'none'};">${row.value}</td>
                      </tr>`).join('')}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:24px 28px;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="text-align:center;">
                          <a href="${data.inviteLink}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:10px;font-size:15px;font-weight:700;letter-spacing:0.3px;box-shadow:0 4px 16px rgba(79,70,229,0.35);">
                            Complete Registration &rarr;
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:14px;text-align:center;">
                          <p style="margin:0;font-size:11px;color:#94a3b8;">Or copy this link: <a href="${data.inviteLink}" style="color:#6366f1;word-break:break-all;">${data.inviteLink}</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Expiry Notice -->
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:0 28px 24px;">
                    <table width="100%" cellspacing="0" cellpadding="0" style="background:#fffbeb;border-radius:8px;border:1px solid #fde68a;">
                      <tr>
                        <td style="padding:12px 16px;font-size:12px;color:#92400e;text-align:center;">
                          ⏰ This invitation link expires on <strong>${expiryDate}</strong>. Please register before it expires.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Security Note -->
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:0 28px 28px;">
                    <table width="100%" cellspacing="0" cellpadding="0" style="background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd;">
                      <tr>
                        <td style="padding:12px 16px;font-size:11px;color:#0369a1;text-align:center;line-height:1.6;">
                          🔒 If you did not expect this invitation, please ignore this email or contact your HR team.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 0;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#64748b;font-weight:600;">Musterbook HRMS</p>
              <p style="margin:0;font-size:11px;color:#94a3b8;">© ${new Date().getFullYear()} Musterbook. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  },

  text: (data: AdminInviteTemplateData) => {
    const roleDisplay = data.role ? data.role.charAt(0).toUpperCase() + data.role.slice(1) : 'Employee';
    const expiryDate = new Date(data.expiresAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `
MUSTERBOOK HRMS — Employee Registration Invitation

Welcome, ${data.firstName || 'Team Member'}!

You've been invited to join Musterbook HRMS. Please complete your registration using the link below.

Your Details:
- Name: ${data.firstName || ''} ${data.lastName || ''}
${data.employeeId ? `- Employee ID: ${data.employeeId}` : ''}
- Designation: ${roleDisplay}
${data.department ? `- Department: ${data.department}` : ''}
${data.phone ? `- Phone: ${data.phone}` : ''}
${data.joiningDate ? `- Joining Date: ${data.joiningDate}` : ''}
${data.salary ? `- Salary (CTC): ₹${data.salary}` : ''}
${data.reportingManager ? `- Reports To: ${data.reportingManager}` : ''}

Complete your registration: ${data.inviteLink}

This link expires on ${expiryDate}.

If you did not expect this invitation, please ignore this email.

© ${new Date().getFullYear()} Musterbook. All rights reserved.
    `;
  },
};
