const express = require("express");
const router = express.Router();
const {
  getUpcomingClasses, getAllClasses, createClass, updateClass,
  deleteClass, registerForClass, getRegistrations,
} = require("../controllers/liveclass");
const { protect, admin } = require("../middleware/auth");
const verifyAdmin = require("../middleware/admin");

// Public — get upcoming classes
router.get("/", getUpcomingClasses);

// Admin routes
router.get("/all", protect, verifyAdmin, getAllClasses);
router.post("/", protect, verifyAdmin, createClass);
router.patch("/:id", protect, verifyAdmin, updateClass);
router.delete("/:id", protect, verifyAdmin, deleteClass);
router.get("/:id/registrations", protect, verifyAdmin, getRegistrations);

// User — register for class
router.post("/:id/register", protect, registerForClass);

module.exports = router;
