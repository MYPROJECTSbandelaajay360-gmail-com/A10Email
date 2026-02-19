import { Request, Response } from 'express';
import { EmailService } from '../services/EmailService';
import { asyncHandler } from '../middleware/errorHandler';
import logger from '../config/logger';

export class EmailController {
  /**
   * Send generic email
   * POST /api/v1/email/send
   */
  static sendEmail = asyncHandler(async (req: Request, res: Response) => {
    // Return immediately - process email in background
    res.json({
      success: true,
      message: 'Email queued for sending'
    });

    // Process email asynchronously (don't await)
    EmailService.sendEmail(req.body).catch((error: any) => {
      logger.error('Background email send failed', {
        to: req.body.to,
        subject: req.body.subject,
        error: error.message
      });
    });

    return;
  });

  /**
   * Send admin invite email
   * POST /api/v1/email/admin-invite
   */
  static sendAdminInviteEmail = asyncHandler(async (req: Request, res: Response) => {
    console.log('[EmailController] Received Admin Invite Request Body:', JSON.stringify(req.body, null, 2));
    const {
      email, role, inviteLink, expiresAt,
      name, firstName, lastName, phone,
      department, employeeId, salary, joiningDate, reportingManager
    } = req.body;

    if (!email || !role || !inviteLink || !expiresAt) {
      console.error('[EmailController] Missing required fields:', { email, role, inviteLink, expiresAt });
      return res.status(400).json({
        success: false,
        error: 'email, role, inviteLink, and expiresAt are required'
      });
    }

    // Return immediately - process email in background
    console.log('[EmailController] Valid request, queueing background job...');
    res.json({
      success: true,
      message: 'Email queued for sending'
    });

    // Process email asynchronously (don't await)
    EmailService.sendAdminInviteEmail({
      email,
      role,
      inviteLink,
      expiresAt: new Date(expiresAt),
      name,
      firstName,
      lastName,
      phone,
      department,
      employeeId,
      salary,
      joiningDate,
      reportingManager
    }).then((result) => {
      console.log('[EmailController] Background job finished:', result);
    }).catch((error: any) => {
      console.error('[EmailController] Background job failed:', error);
      logger.error('Background admin invite email send failed', {
        email,
        role,
        error: error.message
      });
    });

    return;
  });

  /**
   * Send account created email
   * POST /api/v1/email/account-created
   */
  static sendAccountCreatedEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, name, phone } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        error: 'email and name are required'
      });
    }

    // Return immediately - process email in background
    res.json({
      success: true,
      message: 'Email queued for sending'
    });

    // Process email asynchronously (don't await)
    EmailService.sendAccountCreatedEmail(email, name, phone).catch((error: any) => {
      logger.error('Background account created email send failed', {
        email,
        name,
        error: error.message
      });
    });

    return;
  });

  /**
   * Send password reset email
   * POST /api/v1/email/password-reset
   */
  static sendPasswordResetEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, resetLink, name, expiresAt } = req.body;

    if (!email || !resetLink) {
      return res.status(400).json({
        success: false,
        error: 'email and resetLink are required'
      });
    }

    // Return immediately - process email in background
    res.json({
      success: true,
      message: 'Email queued for sending'
    });

    // Process email asynchronously (don't await)
    EmailService.sendPasswordResetEmail(
      email,
      resetLink,
      name,
      expiresAt ? new Date(expiresAt) : undefined
    ).catch((error: any) => {
      logger.error('Background password reset email send failed', {
        email,
        error: error.message
      });
    });

    return;
  });

  /**
   * Health check with provider verification
   * GET /api/v1/email/health
   */
  static healthCheck = asyncHandler(async (_req: Request, res: Response) => {
    const { validateEnv } = await import('../config/env');
    const env = validateEnv();

    res.json({
      success: true,
      data: {
        status: 'healthy',
        service: 'extrahand-email-service',
        provider: env.EMAIL_PROVIDER,
        from: env.EMAIL_FROM_ADDRESS,
        timestamp: new Date().toISOString(),
      }
    });
  });
}
