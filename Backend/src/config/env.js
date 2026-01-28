const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const requiredKeys = [
    "MONGO_URI",
    "JWT_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "EMAIL_USER",
    "EMAIL_USER",
    "EMAIL_PASS",
    "FRONTEND_URL"
];

const missingKeys = requiredKeys.filter(key => !process.env[key]);

if (missingKeys.length > 0) {
    console.error("❌ Critical Error: Missing environment variables:");
    missingKeys.forEach(key => console.error(`   - ${key}`));
    process.exit(1);
}

// Optional Keys Warning
const optionalKeys = ["RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"];
const missingOptional = optionalKeys.filter(key => !process.env[key]);
if (missingOptional.length > 0) {
    console.warn("⚠️  Warning: Missing Payment Configuration:");
    missingOptional.forEach(key => console.warn(`   - ${key}`));
}

const config = {
    PORT: parseInt(process.env.PORT || "5000", 10),
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : ["http://localhost:5173", "http://localhost:3000", "http://localhost:8080"],
    NODE_ENV: process.env.NODE_ENV || "development",
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    FRONTEND_URL: process.env.FRONTEND_URL
};

module.exports = config;
