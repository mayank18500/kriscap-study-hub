const express = require("express");
const { createOrder, verifyPayment, getMyOrders, getInvoice } = require("../controllers/order");
const { protect: verifyToken } = require("../middleware/auth");

const router = express.Router();

router.use(verifyToken);
router.post("/create", createOrder); // Maps to /api/orders/create
router.post("/verify", verifyPayment); // Maps to /api/orders/verify (Note: Frontend expects /api/payments/verify, I should check this)
router.get("/my-orders", getMyOrders);
router.get("/invoice/:id", getInvoice);

module.exports = router;
