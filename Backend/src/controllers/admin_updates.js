
exports.getAdminComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        const formattedComments = comments.map(c => ({
            id: c._id,
            user: c.user ? c.user.name : "Unknown",
            email: c.user ? c.user.email : "",
            text: c.text,
            isVisible: c.isVisible,
            date: c.createdAt
        }));

        res.json(formattedComments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.toggleCommentVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        comment.isVisible = !comment.isVisible;
        await comment.save();

        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
