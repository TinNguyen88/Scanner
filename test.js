/**
 * Test OCR Scanner Backend Email Configuration
 * Chạy: node test.js
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('\n📧 OCR Scanner - Email Configuration Test\n');
console.log('═'.repeat(50));

// Check environment variables
console.log('\n1️⃣  Checking Environment Variables...\n');

const required = ['EMAIL_SERVICE', 'EMAIL_USER', 'EMAIL_PASSWORD'];
let isValid = true;

required.forEach(key => {
    const value = process.env[key];
    if (value) {
        const masked = key === 'EMAIL_PASSWORD' ? '***' + value.slice(-4) : value;
        console.log(`   ✓ ${key}: ${masked}`);
    } else {
        console.log(`   ✗ ${key}: NOT SET`);
        isValid = false;
    }
});

if (!isValid) {
    console.log('\n❌ Missing configuration. Please set in .env file:');
    console.log('\n   cp .env.example .env');
    console.log('   # Edit .env with your email credentials\n');
    process.exit(1);
}

// Test email connection
console.log('\n2️⃣  Testing Email Connection...\n');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('   ✗ Email connection failed:\n');
        console.log('   Error:', error.message);
        
        if (error.message.includes('Invalid login')) {
            console.log('\n   💡 Troubleshooting:');
            console.log('      - Check EMAIL_USER and EMAIL_PASSWORD in .env');
            console.log('      - For Gmail: Use 16-digit App Password (not regular password)');
            console.log('      - Enable 2-Factor Authentication first');
        }
        
        process.exit(1);
    } else {
        console.log('   ✓ Email connection successful!');
        console.log(`   ✓ SMTP Server: ${process.env.EMAIL_SERVICE}`);
        console.log(`   ✓ Email: ${process.env.EMAIL_USER}`);
    }

    // Send test email
    console.log('\n3️⃣  Sending Test Email...\n');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to self
        subject: '✓ OCR Scanner - Test Email',
        html: `
            <html>
                <body style="font-family: Arial; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #667eea;">✓ OCR Scanner Backend Test</h2>
                        
                        <p>Nếu bạn nhận được email này, backend email của bạn đã cấu hình thành công! 🎉</p>
                        
                        <div style="background: #f0f4ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
                            <strong>✓ Configuration Status:</strong><br>
                            Service: ${process.env.EMAIL_SERVICE}<br>
                            User: ${process.env.EMAIL_USER}<br>
                            Time: ${new Date().toLocaleString('vi-VN')}<br>
                            Node Version: ${process.version}
                        </div>
                        
                        <p style="color: #666; font-size: 12px;">
                            Bạn có thể xóa email này.<br>
                            Hệ thống OCR Scanner đã sẵn sàng gửi email kết quả OCR.
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 30px;">
                        <p style="font-size: 12px; color: #999;">
                            © NGUYỄN TRUNG TÍN - OCR Scanner Pro v2.0
                        </p>
                    </div>
                </body>
            </html>
        `,
        text: 'Test email from OCR Scanner Backend - Email configuration successful!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('   ✗ Failed to send test email:');
            console.log('   Error:', error.message);
            process.exit(1);
        } else {
            console.log('   ✓ Test email sent successfully!');
            console.log(`   ✓ Message ID: ${info.messageId}`);
            console.log(`   ✓ Response: ${info.response}`);
            
            console.log('\n' + '═'.repeat(50));
            console.log('\n✅ Email Backend Configuration Complete!\n');
            console.log('Next steps:');
            console.log('   1. Check your email (received test email)');
            console.log('   2. Run: npm start');
            console.log('   3. Open: http://localhost:3000/index.html');
            console.log('   4. Start using OCR Scanner!\n');
            
            process.exit(0);
        }
    });
});

// Timeout after 10 seconds
setTimeout(() => {
    console.log('\n⏱️  Test timeout (10s). Check your email connection.\n');
    process.exit(1);
}, 10000);
