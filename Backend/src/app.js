const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const config = require("./config/env");

const app = express();

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
    origin: config.ALLOWED_ORIGINS, // Frontend URL
    credentials: true,
}));

// Webhook needs raw body, mount before express.json()
const webhookRoutes = require("./routes/webhook");
app.use("/api/webhooks", webhookRoutes);

app.use(express.json());
app.use(cookieParser());
const { clerkMiddleware } = require("@clerk/express");
app.use(clerkMiddleware());
app.use("/uploads", express.static("uploads"));

// Basic Route
app.get("/", (req, res) => {
    res.send("Kriscap Education API is running");
});

// Import Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");
const userRoutes = require("./routes/user");
const notificationRoutes = require("./routes/notification");
const adminRoutes = require("./routes/admin");
const commentRoutes = require("./routes/comment");

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/comments", commentRoutes);
const wishlistRoutes = require("./routes/wishlist");
app.use("/api/wishlist", wishlistRoutes);

// v2 Routes
const downloadRoutes = require("./routes/download");
const liveclassRoutes = require("./routes/liveclass");
const testimonialRoutes = require("./routes/testimonial");
const faqRoutes = require("./routes/faq");
app.use("/api/downloads", downloadRoutes);
app.use("/api/classes", liveclassRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : undefined
    });
});

module.exports = app;
