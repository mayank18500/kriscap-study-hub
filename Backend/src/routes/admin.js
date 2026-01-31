const express = require("express");
const { protect: verifyToken } = require("../middleware/auth");
const verifyAdmin = require("../middleware/admin");
const {
    getAdminStats,
    getAdminProducts,
    createProduct,
    updateProduct,
    toggleProductStatus,
    getAdminOrders,
    updateOrderStatus,
    getAdminUsers,
    getAdminPayments,
    deleteUser,
    deleteProduct,
    getAdminComments,
    toggleCommentVisibility,
    deleteAdminComment
} = require("../controllers/admin");

const router = express.Router();

// All routes require login + admin role
router.use(verifyToken, verifyAdmin);

// Dashboard
router.get("/stats", getAdminStats);

// Products
router.get("/products", getAdminProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.patch("/products/:id/toggle", toggleProductStatus);
router.delete("/products/:id", deleteProduct);

// Orders
router.get("/orders", getAdminOrders);
router.patch("/orders/:id/status", updateOrderStatus);

// Users
router.get("/users", getAdminUsers);
router.delete("/users/:id", deleteUser);

// Payments
router.get("/payments", getAdminPayments);

// Comments
router.get("/comments", getAdminComments);
router.patch("/comments/:id/toggle", toggleCommentVisibility);
router.delete("/comments/:id", deleteAdminComment);

module.exports = router;
