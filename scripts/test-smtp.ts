
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Load env from one directory up
dotenv.config({ path: path.join(__dirname, '../.env') });

async function testSMTP() {
    console.log('--- SMTP Connectivity Test ---');
    console.log('Host:', process.env.SMTP_HOST);
    console.log('Port:', process.env.SMTP_PORT);
    console.log('User:', process.env.SMTP_USER);
    console.log('Secure:', process.env.SMTP_SECURE);

    if (!process.env.SMTP_PASS || process.env.SMTP_PASS.includes('your_microsoft_password')) {
        console.error('❌ ERROR: SMTP_PASS is still set to the default placeholder or empty!');
        console.error('Please update .env with your actual password.');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            ciphers: 'SSLv3', // Matching the provider config
            rejectUnauthorized: false
        }
    });

    try {
        console.log('1. Verifying connection...');
        await transporter.verify();
        console.log('✅ Connection Verified!');

        console.log('2. Sending test email...');
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER, // Send to self
            subject: 'Test Email from ExtraHand Debugger',
            text: 'If you see this, SMTP is working correctly!',
        });
        console.log('✅ Email Sent!');
        console.log('Message ID:', info.messageId);
    } catch (error: any) {
        console.error('❌ test failed!');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        if (error.response) console.error('Server Response:', error.response);
    }
}

testSMTP();
