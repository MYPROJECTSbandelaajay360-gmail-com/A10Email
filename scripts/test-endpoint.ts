
// import fetch from 'node-fetch'; // Using native fetch
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 4007;
const AUTH_TOKEN = process.env.SERVICE_AUTH_TOKEN;

console.log('--- Testing Email API Endpoint ---');
console.log(`Target: http://localhost:${PORT}/api/v1/email/admin-invite`);
console.log(`Auth Token: ${AUTH_TOKEN ? AUTH_TOKEN.substring(0, 5) + '...' : 'MISSING'}`);

async function testEndpoint() {
    try {
        const response = await fetch(`http://localhost:${PORT}/api/v1/email/admin-invite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-service-auth': AUTH_TOKEN || ''
            },
            body: JSON.stringify({
                email: 'support@extrahand.in', // Sending to self to test
                role: 'admin',
                inviteLink: 'http://localhost:3000/test-link',
                expiresAt: new Date(Date.now() + 86400000).toISOString(),
                team: 'Test Team',
                department: 'Testing'
            })
        });

        console.log(`Response Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log('Response Body:', text);

        if (response.ok) {
            console.log('✅ Endpoint test SUCCESS! The service received the request.');
        } else {
            console.log('❌ Endpoint test FAILED! Service rejected the request.');
        }

    } catch (error) {
        console.error('❌ Network Error:', error);
    }
}

testEndpoint();
