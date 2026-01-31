const express = require("express");
const { verifyPayment } = require("../controllers/order");
const { protect: verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/verify", verifyToken, verifyPayment);

module.exports = router;
