const jwt = require("jsonwebtoken");
const config = require("../config/env");

const verifyToken = async (req, res, next) => {
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

module.exports = verifyToken;
