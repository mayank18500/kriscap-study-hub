import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:8080"], // Frontend URL
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
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import paymentRoutes from "./routes/payment";
import userRoutes from "./routes/user";
import notificationRoutes from "./routes/notification";

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);
import adminRoutes from "./routes/admin";
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : undefined
    });
});

export default app;
