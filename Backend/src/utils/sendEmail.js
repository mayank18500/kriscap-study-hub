const nodemailer = require("nodemailer");
const config = require("../config/env");

const sendEmail = async (to, subject, html) => {
    if (config.EMAIL_USER && config.EMAIL_PASS) {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // Use SSL/TLS
                auth: {
                    user: config.EMAIL_USER,
                    pass: config.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: `"Kriscap Education" <${config.EMAIL_USER}>`,
                to,
                subject,
                html,
            });
            console.log(`[EMAIL SENT] To: ${to} | Subject: ${subject}`);
            return;
        } catch (error) {
            console.error("[EMAIL ERROR] Failed to send real email:", error);
            // Fallback to mock logger below logic continue...
        }
    }

    // Mock email sending by logging to console (Fallback or Dev mode)
    console.log("==================================================");
    console.log(`[MOCK EMAIL] To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${html.substring(0, 100)}...`); // Truncate long content
    console.log("==================================================");
    return Promise.resolve();
};

module.exports = sendEmail;
