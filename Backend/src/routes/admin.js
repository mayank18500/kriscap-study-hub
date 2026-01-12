const express = require("express");
const verifyToken = require("../middleware/auth");
const verifyAdmin = require("../middleware/admin");
const {
    getAdminStats,
    getAdminProducts,
    createProduct,
    toggleProductStatus,
    getAdminOrders,
    updateOrderStatus,
    getAdminUsers,
    getAdminPayments,
    uploadFile
} = require("../controllers/admin");
const upload = require("../middleware/upload");

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
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
