const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { protect, admin } = require("../middleware/auth");

router.get("/", commentController.getComments);
router.post("/", protect, commentController.createComment);
router.delete("/:id", protect, admin, commentController.deleteComment);

module.exports = router;
