
exports.deleteAdminComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
