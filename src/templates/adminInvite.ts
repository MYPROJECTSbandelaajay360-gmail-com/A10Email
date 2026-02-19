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
  subject: "Welcome! Complete Your CognitBotz HRMS Registration",

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

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to CognitBotz HRMS</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f0f4f8;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    @media only screen and (max-width: 400px) {
      .card { width: 100% !important; margin: 12px !important; }
      .content { padding: 16px !important; }
      .title { font-size: 18px !important; }
      .btn { padding: 10px 20px !important; font-size: 13px !important; }
    }
  </style>
</head>
<body>
  <table width="100%" cellspacing="0" cellpadding="0" style="background:#f0f4f8;padding:24px 12px;">
    <tr>
      <td align="center">
        <!-- Compact Card - 40% smaller (312px instead of 520px) -->
        <table class="card" width="312" cellspacing="0" cellpadding="0" style="max-width:312px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:16px;text-align:center;">
              <!-- Simple CB Logo -->
              <table cellspacing="0" cellpadding="0" style="margin:0 auto;">
                <tr>
                  <td style="background:#fff;width:36px;height:36px;border-radius:8px;text-align:center;vertical-align:middle;">
                    <span style="font-size:16px;font-weight:700;color:#6366f1;">CB</span>
                  </td>
                </tr>
              </table>
              <p style="margin:8px 0 0;font-size:10px;color:rgba(255,255,255,0.9);letter-spacing:1px;text-transform:uppercase;">CognitBotz HRMS</p>
            </td>
          </tr>
          
          <!-- Welcome Message -->
          <tr>
            <td class="content" style="padding:20px 18px 12px;text-align:center;">
              <h1 class="title" style="margin:0 0 4px;font-size:20px;font-weight:600;color:#1e293b;">Welcome, ${data.firstName || 'Team Member'}!</h1>
              <p style="margin:0;font-size:12px;color:#64748b;">Complete your registration to get started</p>
            </td>
          </tr>
          
          <!-- Employee Details Card -->
          <tr>
            <td style="padding:0 18px 16px;">
              <table width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
                
                <!-- Name -->
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Name</td>
                        <td style="font-size:13px;color:#1e293b;font-weight:500;text-align:right;">${data.firstName || ''} ${data.lastName || ''}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Employee ID -->
                ${data.employeeId ? `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Employee ID</td>
                        <td style="font-size:13px;color:#6366f1;font-weight:600;text-align:right;">${data.employeeId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Designation -->
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Designation</td>
                        <td style="font-size:13px;color:#1e293b;font-weight:500;text-align:right;">${roleDisplay}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Department -->
                ${data.department ? `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Department</td>
                        <td style="font-size:13px;color:#1e293b;font-weight:500;text-align:right;">${data.department}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Phone -->
                ${data.phone ? `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Phone</td>
                        <td style="font-size:13px;color:#1e293b;font-weight:500;text-align:right;">${data.phone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Joining Date -->
                ${joiningDateFormatted ? `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Joining Date</td>
                        <td style="font-size:13px;color:#1e293b;font-weight:500;text-align:right;">${joiningDateFormatted}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Salary -->
                ${salaryFormatted ? `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Salary (CTC)</td>
                        <td style="font-size:13px;color:#059669;font-weight:600;text-align:right;">${salaryFormatted}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Reporting Manager -->
                ${data.reportingManager ? `
                <tr>
                  <td style="padding:10px 12px;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Reports To</td>
                        <td style="font-size:13px;color:#1e293b;font-weight:500;text-align:right;">${data.reportingManager}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
              </table>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td style="padding:0 18px 16px;text-align:center;">
              <a href="${data.inviteLink}" class="btn" style="display:inline-block;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);color:#fff;text-decoration:none;padding:12px 32px;border-radius:6px;font-size:14px;font-weight:600;">
                Complete Registration →
              </a>
            </td>
          </tr>
          
          <!-- Expiry Notice -->
          <tr>
            <td style="padding:0 18px 16px;">
              <table width="100%" cellspacing="0" cellpadding="0" style="background:#fef3c7;border-radius:6px;border:1px solid #fcd34d;">
                <tr>
                  <td style="padding:10px 12px;font-size:11px;color:#92400e;text-align:center;">
                    ⏰ Link expires on <strong>${expiryDate}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:12px 18px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:10px;color:#94a3b8;">© ${new Date().getFullYear()} CognitBotz. All rights reserved.</p>
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
COGNITBOTZ HRMS - Employee Registration

Welcome, ${data.firstName || 'Team Member'}!

Your Details:
- Name: ${data.firstName || ''} ${data.lastName || ''}
${data.employeeId ? `- Employee ID: ${data.employeeId}` : ''}
- Designation: ${roleDisplay}
${data.department ? `- Department: ${data.department}` : ''}
${data.phone ? `- Phone: ${data.phone}` : ''}
${data.joiningDate ? `- Joining Date: ${data.joiningDate}` : ''}
${data.salary ? `- Salary: ₹${data.salary}` : ''}
${data.reportingManager ? `- Reports To: ${data.reportingManager}` : ''}

Complete your registration: ${data.inviteLink}

This link expires on ${expiryDate}.

© ${new Date().getFullYear()} CognitBotz. All rights reserved.
    `;
  },
};
