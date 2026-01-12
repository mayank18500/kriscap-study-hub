import express from "express";
import { verifyPayment } from "../controllers/order";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/verify", verifyToken, verifyPayment);

export default router;
