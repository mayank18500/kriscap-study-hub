import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import config from "../config/env";

interface AuthRequest extends Request {
    user?: IUser;
    userId?: string;
}

const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

export default verifyToken;
