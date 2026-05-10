import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Format the OTP for better readability
        const formattedOTP = otp.toString().split('').join(' ');

        const mailOptions = {
            from: '"Rezumix" <no-reply@rezumix.com>',
            to: email,
            subject: "Verify Your Email - Rezumix",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Verification</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            line-height: 1.6;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background: linear-gradient(to right, #3b82f6, #8b5cf6);
                            padding: 20px;
                            text-align: center;
                            border-radius: 8px 8px 0 0;
                        }
                        .header h1 {
                            color: white;
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            background-color: #f9fafb;
                            padding: 30px;
                            border-radius: 0 0 8px 8px;
                            border: 1px solid #e5e7eb;
                            border-top: none;
                        }
                        .otp-container {
                            background-color: #ffffff;
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
                            padding: 15px;
                            margin: 20px 0;
                            text-align: center;
                        }
                        .otp {
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 1px;
                            color: #4f46e5;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            color: #6b7280;
                            font-size: 12px;
                        }
                        .button {
                            display: inline-block;
                            background: linear-gradient(to right, #3b82f6, #8b5cf6);
                            color: white;
                            text-decoration: none;
                            padding: 12px 25px;
                            border-radius: 6px;
                            font-weight: bold;
                            margin-top: 15px;
                        }
                        .warning {
                            color: #b91c1c;
                            font-size: 13px;
                            margin-top: 15px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Rezumix</h1>
                        </div>
                        <div class="content">
                            <h2>Email Verification</h2>
                            <p>Hello,</p>
                            <p>Thank you for registering with Rezumix. To complete your registration, please verify your email address using the OTP below:</p>
                            
                            <div class="otp-container">
                                <p>Your One-Time Password:</p>
                                <div class="otp">${formattedOTP}</div>
                                <p>Valid for 10 minutes only</p>
                            </div>
                            
                            <p>If you did not request this verification, please ignore this email or contact our support team if you have concerns.</p>
                            
                            <div class="warning">
                                <strong>Security Notice:</strong> Never share this OTP with anyone. Rezumix representatives will never ask for your OTP.
                            </div>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} Rezumix. All rights reserved.</p>
                            <p>This is an automated message, please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error("Error while sending OTP:", error);
        throw new Error("Failed to send verification email");
    }
};