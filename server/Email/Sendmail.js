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
async function sendMail(
    to,
    subject,
    consultantName,
    specialty,
    generatedPassword
) {
    const mailOptions = {
        from: '"Furry Pet Clinic" <furrrypetclinic@gmail.com>',
        to: to,
        subject: subject,
        html: `
    <div style="font-family: 'Google Sans', 'Noto Naskh Arabic UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #ffffff;">
      <h2 style="color: #000; text-align: center;"><em>Furry Pet Clinic</em></h2>
      <p style="color: #000; font-size: 16px;">
        Dear <strong>${consultantName}</strong>,
      </p>
      <p style="color: #000; line-height: 1.6;">
        We are pleased to welcome you to the Furry Pet Clinic as a consultant. Your expertise in <strong>${specialty}</strong> will be a valuable addition to our clinic.
      </p>
      <p style="color: #000; font-weight: bold;">
        You have been officially added to the Furry Pet Clinic as a consultant. 
        Your login password is: <strong>${generatedPassword}</strong>
      </p>
      <p style="color: #000;">
        If you have any questions or need further information, please don't hesitate to reach out. We're excited to have you on board!
      </p>
      <p style="text-align: center;">
        <a href="http://localhost:5173/Consultantlogin" style="color: #ff6347; text-decoration: none; font-weight: bold;">Login here</a>
      </p>
      <p style="text-align: center; font-size: 12px; color: #999;">
        © 2024 Furry Pet Clinic. All rights reserved.
      </p>
    </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent:", info.messageId);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

module.exports = { sendMail };