const express = require("express");
const router = express.Router();
const {
  getTestimonials, submitTestimonial, getAllTestimonials,
  updateTestimonial, deleteTestimonial,
} = require("../controllers/testimonial");
const { protect } = require("../middleware/auth");
const verifyAdmin = require("../middleware/admin");

// Public
router.get("/", getTestimonials);

// Authenticated user — submit
router.post("/", protect, submitTestimonial);

// Admin
router.get("/all", protect, verifyAdmin, getAllTestimonials);
router.patch("/:id", protect, verifyAdmin, updateTestimonial);
router.delete("/:id", protect, verifyAdmin, deleteTestimonial);

module.exports = router;
