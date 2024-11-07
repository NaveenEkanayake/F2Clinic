const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendAdminForgotPasswordEmail(to, resetLink) {
    const mailOptions = {
        from: '"Furry Pet Clinic" <furrrypetclinic@gmail.com>',
        to: to,
        subject: "Password Reset Request",
        html: `
            <div style="font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #ffffff;">
                <h2 style="color: #000; text-align: center;"><em>Furry Pet Clinic</em></h2>
                <p style="color: #000; font-size: 16px;">
                    Dear Admin,
                </p>
                <p style="color: #000; line-height: 1.6;">
                    You recently requested to reset your password for your Furry Pet Clinic account. Click the button below to reset it. If you did not request a password reset, please ignore this email.
                </p>
                <p style="text-align: center;">
                    <a href="${resetLink}" style="color: #ffffff; background-color: #ff6347; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">Reset Password</a>
                </p>
                <p style="color: #000; line-height: 1.6; margin-top: 20px;">
                    This link will expire in 1 hour.
                </p>
                <p style="text-align: center; font-size: 12px; color: #999;">
                    © 2024 Furry Pet Clinic. All rights reserved.
                </p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent:", info.messageId);
    } catch (error) {
        console.error("Error occurred while sending password reset email:", error);
    }
}

module.exports = { sendAdminForgotPasswordEmail };