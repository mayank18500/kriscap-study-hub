const express = require("express");
const { getDashboardStats, saveAddress, getDownloads, updateProfile } = require("../controllers/user");
const { protect: verifyToken } = require("../middleware/auth");

const router = express.Router();

router.use(verifyToken);
router.get("/dashboard", getDashboardStats);
router.post("/address", saveAddress);
router.patch("/profile", updateProfile);
router.get("/downloads", getDownloads);

module.exports = router;
