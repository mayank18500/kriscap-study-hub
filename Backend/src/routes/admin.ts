import express from "express";
import verifyToken from "../middleware/auth";
import verifyAdmin from "../middleware/admin";
import {
    getAdminStats,
    getAdminProducts,
    createProduct,
    toggleProductStatus,
    getAdminOrders,
    updateOrderStatus,
    getAdminUsers,
    getAdminPayments
} from "../controllers/admin";

const router = express.Router();

// All routes require login + admin role
router.use(verifyToken, verifyAdmin);

// Dashboard
router.get("/stats", getAdminStats);

// Products
router.get("/products", getAdminProducts);
router.post("/products", createProduct);
router.patch("/products/:id/toggle", toggleProductStatus);

// Orders
router.get("/orders", getAdminOrders);
router.patch("/orders/:id/status", updateOrderStatus);

// Users
router.get("/users", getAdminUsers);

// Payments
router.get("/payments", getAdminPayments);

// Uploads
import upload from "../middleware/upload";
import { uploadFile } from "../controllers/admin";
router.post("/upload", upload.single("file"), uploadFile);

export default router;
