const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ isVisible: true })
            .populate("user", "name role")
            .sort({ createdAt: -1 })
            .limit(20);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Text is required" });

        const comment = await Comment.create({
            user: req.userId,
            text
        });

        const populatedComment = await Comment.findById(comment._id).populate("user", "name role");

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if user is owner
        if (comment.user.toString() === req.userId) {
            await comment.deleteOne();
            return res.json({ message: "Comment deleted" });
        }

        // Check if user is admin
        const User = require("../models/User");
        const user = await User.findById(req.userId);

        if (user && user.role === "admin") {
            await comment.deleteOne();
            return res.json({ message: "Comment deleted" });
        }

        return res.status(403).json({ message: "Not authorized to delete this comment" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
