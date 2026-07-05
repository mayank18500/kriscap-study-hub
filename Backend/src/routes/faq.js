const express = require("express");
const router = express.Router();
const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require("../controllers/faq");
const { protect } = require("../middleware/auth");
const verifyAdmin = require("../middleware/admin");

// Public
router.get("/", getFAQs);

// Admin
router.post("/", protect, verifyAdmin, createFAQ);
router.patch("/:id", protect, verifyAdmin, updateFAQ);
router.delete("/:id", protect, verifyAdmin, deleteFAQ);

module.exports = router;
