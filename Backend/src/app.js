const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const config = require("./config/env");

const app = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
    origin: config.ALLOWED_ORIGINS, // Frontend URL
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
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

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : undefined
    });
});

module.exports = app;
