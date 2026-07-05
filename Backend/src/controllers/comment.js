const prisma = require("../config/prisma");

exports.getComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            where: { isVisible: true },
            include: { user: { select: { name: true, role: true } } },
            orderBy: { createdAt: "desc" },
            take: 20
        });
        res.json(comments);
    } catch (error) {
        console.error("Get Comments Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Text is required" });

        const comment = await prisma.comment.create({
            data: {
                userId: req.userId,
                text
            },
            include: { user: { select: { name: true, role: true } } }
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Create Comment Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await prisma.comment.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if user is owner
        if (comment.userId === req.userId) {
            await prisma.comment.delete({ where: { id } });
            return res.json({ message: "Comment deleted" });
        }

        // Check if user is admin
        const requestingUser = await prisma.user.findUnique({ where: { id: req.userId } });

        if (requestingUser && requestingUser.role === "ADMIN") {
            await prisma.comment.delete({ where: { id } });
            return res.json({ message: "Comment deleted" });
        }

        return res.status(403).json({ message: "Not authorized to delete this comment" });
    } catch (error) {
        console.error("Delete Comment Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
