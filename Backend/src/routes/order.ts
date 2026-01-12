import express from "express";
import { createOrder, verifyPayment, getMyOrders, getInvoice } from "../controllers/order";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.use(verifyToken);
router.post("/create", createOrder); // Maps to /api/orders/create
router.post("/verify", verifyPayment); // Maps to /api/orders/verify (Note: Frontend expects /api/payments/verify, I should check this)
router.get("/my-orders", getMyOrders);
router.get("/invoice/:id", getInvoice);

export default router;
