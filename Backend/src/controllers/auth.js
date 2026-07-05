const prisma = require("../config/prisma");

exports.register = async (req, res) => {
    res.status(501).json({ message: "Not Implemented. Authentication is handled by Clerk." });
};

exports.login = async (req, res) => {
    res.status(501).json({ message: "Not Implemented. Authentication is handled by Clerk." });
};

exports.logout = (req, res) => {
    res.status(501).json({ message: "Not Implemented. Authentication is handled by Clerk." });
};

exports.getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        console.error("Error in getMe:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.forgotPassword = async (req, res) => {
    res.status(501).json({ message: "Not Implemented. Authentication is handled by Clerk." });
};

exports.resetPassword = async (req, res) => {
    res.status(501).json({ message: "Not Implemented. Authentication is handled by Clerk." });
};
