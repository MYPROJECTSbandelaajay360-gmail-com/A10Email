/**
 * Get CognitBotz logo as an HTML img tag for email templates.
 * Uses CID (Content-ID) reference for inline attachment - bulletproof for Outlook.
 * The logo must be attached with cid: 'cognitbotz-logo' in the email attachments.
 */
export function getLogoHTML(): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
      <tr>
        <td align="center" style="padding:0;">
          <!--[if mso]>
          <table role="presentation" width="80" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="80" height="80" style="width:80px;height:80px;text-align:center;">
                <img src="cid:cognitbotz-logo" alt="CognitBotz Logo" width="80" height="80" style="display:block;width:80px;height:80px;border:0;" />
              </td>
            </tr>
          </table>
          <![endif]-->
          <!--[if !mso]><!-->
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
            </svg>
          </div>
          <!--<![endif]-->
        </td>
      </tr>
    </table>
  `;
}

// Export for backward compatibility
export const EXTRAHAND_LOGO_SVG = getLogoHTML();
export const COGNITBOTZ_LOGO_SVG = getLogoHTML();
