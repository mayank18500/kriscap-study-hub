const prisma = require("../config/prisma");

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        next();
    } catch (error) {
        console.error("Admin verification error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = verifyAdmin;
