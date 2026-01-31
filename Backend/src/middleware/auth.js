const jwt = require("jsonwebtoken");
const config = require("../config/env");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

const admin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user && user.role === "admin") {
            next();
        } else {
            res.status(403).json({ message: "Not authorized as admin" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error checking admin status" });
    }
};

module.exports = { protect, admin };
