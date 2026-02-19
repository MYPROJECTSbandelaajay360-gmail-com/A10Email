import logger from '../../config/logger';
import { EmailPayload, EmailResponse } from '../../types';

export class ConsoleProvider {
    constructor() {
        logger.info('Console Provider initialized - Emails will be logged to console only');
    }

    async send(payload: EmailPayload): Promise<EmailResponse> {
        const messageId = `<console-${Date.now()}@extrahand.in>`;

        console.log('\n=================== [CONSOLE EMAIL] ===================');
        console.log(`To: ${payload.to}`);
        console.log(`Subject: ${payload.subject}`);
        console.log(`From: ${payload.from.name} <${payload.from.email}>`);
        console.log('----------------------- TEXT --------------------------');
        console.log(payload.text);
        console.log('----------------------- HTML --------------------------');
        console.log(payload.html);
        if (payload.attachments?.length) {
            console.log('-------------------- ATTACHMENTS ---------------------');
            payload.attachments.forEach(att => console.log(`- ${att.filename} (${att.contentType}) CID: ${att.cid || 'none'}`));
        }
        console.log('======================================================\n');

        logger.info('Email logged to console', {
            to: payload.to,
            subject: payload.subject,
            messageId
        });

        return {
            messageId,
            accepted: Array.isArray(payload.to) ? payload.to : [payload.to],
            rejected: []
        };
    }

    async verify(): Promise<boolean> {
        return true;
    }
}
