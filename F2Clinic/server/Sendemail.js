import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "furrrypetclinic@gmail.com",
        pass: "ztma mnzb nbbq wqkr",
    },
});

const sendEmail = async(userEmail, subject, html) => {
    try {
        const mailOptions = {
            from: "furrrypetclinic@gmail.com",
            to: userEmail,
            subject: subject,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

const sendEmailRoute = async(req, res) => {
    console.log(req.body);
    const { userEmail, subject, html } = req.body;

    try {
        await sendEmail(userEmail, subject, html);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
};

export { sendEmail, sendEmailRoute };