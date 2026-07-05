const express = require("express");
const router = express.Router();
const { getUserDownloads, getDownloadUrl } = require("../controllers/download");
const { protect } = require("../middleware/auth");

// All download routes require authentication
router.use(protect);

// GET /api/downloads — list user's purchased downloads
router.get("/", getUserDownloads);

// GET /api/downloads/:productId — get download URL (validates ownership)
router.get("/:productId", getDownloadUrl);

module.exports = router;
