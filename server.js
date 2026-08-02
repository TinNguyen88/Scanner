/**
 * OCR Scanner Backend Server
 * Gửi email từ kết quả OCR
 * 
 * Cơ chế:
 * - POST /api/send-email: Gửi email với nội dung OCR
 * - GET /api/health: Check server status
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('./public'));

// Email transporter configuration
// Dùng Gmail (cần enable "Less secure app access")
// Hoặc dùng SendGrid, AWS SES, SMTP khác
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,      // Your email
        pass: process.env.EMAIL_PASSWORD   // App password (not regular password)
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'OCR Scanner Backend is running' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        const { to, subject, body, timestamp } = req.body;

        // Validate input
        if (!to || !subject || !body) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: to, subject, body'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email address'
            });
        }

        // Prevent spam - check body length
        if (body.length > 100000) {
            return res.status(400).json({
                success: false,
                error: 'Email body too long'
            });
        }

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: body,
            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #667eea;">📄 OCR Scanner Result</h2>
                            <hr style="border: none; border-top: 1px solid #e0e0e0;">
                            
                            <pre style="background: #f5f5f5; padding: 15px; border-radius: 6px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;">
${escapeHtml(body)}
                            </pre>
                            
                            <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 20px;">
                            <p style="font-size: 12px; color: #999;">
                                Sent by OCR Scanner Pro on ${new Date(timestamp).toLocaleString('vi-VN')}<br>
                                © NGUYỄN TRUNG TÍN
                            </p>
                        </div>
                    </body>
                </html>
            `,
            replyTo: process.env.EMAIL_USER
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent: ${info.response}`);
        
        res.json({
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Send email error:', error);
        
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to send email',
            details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
});

// Verify email configuration
app.get('/api/verify-email', async (req, res) => {
    try {
        await transporter.verify();
        res.json({ 
            success: true, 
            message: 'Email configuration verified' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 OCR Scanner Backend running on http://localhost:${PORT}`);
    console.log(`\n📧 Email Configuration:`);
    console.log(`   Service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
    console.log(`   User: ${process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 3) + '***' : 'NOT SET'}`);
    console.log(`\n💡 Endpoints:`);
    console.log(`   POST /api/send-email - Send email with OCR result`);
    console.log(`   GET /api/health - Check server status`);
    console.log(`   GET /api/verify-email - Verify email configuration\n`);
});

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\nShutting down gracefully...');
    process.exit(0);
});
