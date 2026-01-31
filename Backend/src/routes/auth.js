const express = require("express");
const {
    register,
    login,
    logout,
    getMe,
    forgotPassword,
    resetPassword
} = require("../controllers/auth");
const { protect: verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
// router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);
router.post("/logout", logout);
router.get("/me", verifyToken, getMe);

module.exports = router;
