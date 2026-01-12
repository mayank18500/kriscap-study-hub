import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/unread-count", (req: Request, res: Response) => {
    // Mock for now, or implement real DB count
    res.json({ count: 2 });
});

export default router;
