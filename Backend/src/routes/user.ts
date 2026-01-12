import express from "express";
import { getDashboardStats, saveAddress, getDownloads, updateProfile } from "../controllers/user";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.use(verifyToken);
router.get("/dashboard", getDashboardStats);
router.post("/address", saveAddress);
router.patch("/profile", updateProfile);
router.get("/downloads", getDownloads);

export default router;
