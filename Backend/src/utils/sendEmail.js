const nodemailer = require("nodemailer");
const config = require("../config/env");

const sendEmail = async (to, subject, html) => {
    try {
        // If credentials are not set, just log for dev
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("==================================================");
            console.log(`[MOCK EMAIL] To: ${to}`);
            console.log(`Subject: ${subject}`);
            console.log(`Content: ${html}`);
            console.log("==================================================");
            return;
        }

        // DEBUGGING: Check if env vars are present (do not log full password)
        console.log("DEBUG: Sending email...");
        console.log("DEBUG: USER =", process.env.EMAIL_USER);
        console.log("DEBUG: PASS Length =", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "Missing");

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // Enable detailed logs
            logger: true,
            debug: true,
        });

        const info = await transporter.sendMail({
            from: `"Kriscap Education" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error("Email send failed:", error);
        // Don't throw to prevent crashing auth flow, but user might not get OTP
    }
};

module.exports = sendEmail;
