import nodemailer from "nodemailer";

export const sendUserEmail = async (email, name, content) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,  
            replyTo: email,                 
            to: "rezumix.ai@gmail.com",
            subject: `New Contact Query from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Contact Query</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            line-height: 1.6;
                            color: #333;
                            margin: 0;
                            padding: 0;
                            background-color: #f3f4f6;
                        }
                        .container {
                            max-width: 600px;
                            margin: 40px auto;
                            padding: 20px;
                        }
                        .header {
                            background: linear-gradient(to right, #3b82f6, #8b5cf6);
                            padding: 24px 30px;
                            text-align: center;
                            border-radius: 12px 12px 0 0;
                        }
                        .header h1 {
                            color: white;
                            margin: 0;
                            font-size: 22px;
                            letter-spacing: 0.5px;
                        }
                        .content {
                            background-color: #ffffff;
                            padding: 32px;
                            border-radius: 0 0 12px 12px;
                            border: 1px solid #e5e7eb;
                            border-top: none;
                        }
                        .info-row {
                            display: flex;
                            align-items: flex-start;
                            margin-bottom: 16px;
                            padding-bottom: 16px;
                            border-bottom: 1px solid #f3f4f6;
                        }
                        .info-row:last-child {
                            border-bottom: none;
                            margin-bottom: 0;
                            padding-bottom: 0;
                        }
                        .label {
                            font-size: 12px;
                            font-weight: bold;
                            color: #6b7280;
                            text-transform: uppercase;
                            letter-spacing: 0.8px;
                            min-width: 90px;
                            padding-top: 2px;
                        }
                        .value {
                            font-size: 15px;
                            color: #111827;
                            flex: 1;
                        }
                        .message-box {
                            background-color: #f9fafb;
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
                            padding: 16px;
                            font-size: 15px;
                            color: #374151;
                            white-space: pre-wrap;
                            line-height: 1.7;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 24px;
                            color: #9ca3af;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📬 New Contact Query — Rezumix</h1>
                        </div>
                        <div class="content">
                            <div class="info-row">
                                <span class="label">Name</span>
                                <span class="value">${name}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Email</span>
                                <span class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></span>
                            </div>
                            <div class="info-row">
                                <span class="label">Message</span>
                                <span class="value">
                                    <div class="message-box">${content}</div>
                                </span>
                            </div>
                        </div>
                        <div class="footer">
                            This message was sent via the Rezumix contact form.<br/>
                            Reply directly to this email to respond to ${name}.
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error("Error while sending contact email:", error);
        throw new Error("Failed to send contact email");
    }
};