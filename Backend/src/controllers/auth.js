const bcrypt = require("bcryptjs");
const config = require("../config/env");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const PendingUser = require("../models/PendingUser");
const sendEmail = require("../utils/sendEmail");

// Generate 6 digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const otp = generateOTP();

        // Save to PendingUser (upsert to handle retries)
        await PendingUser.findOneAndUpdate(
            { email },
            { name, email, password: hashedPassword, phoneNumber, otp },
            { upsert: true, new: true }
        );

        // Send OTP
        await sendEmail(
            email,
            "Your Verification Code - Kriscap Education",
            `<h3>Your OTP is: <b style="font-size: 24px;">${otp}</b></h3><p>This code expires in 10 minutes.</p>`
        );

        res.status(200).json({ message: "OTP sent to your email. Please verify." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const pendingUser = await PendingUser.findOne({ email });

        if (!pendingUser) {
            return res.status(400).json({ message: "Invalid or expired OTP. Please register again." });
        }

        if (pendingUser.otp !== otp) {
            return res.status(400).json({ message: "Incorrect OTP" });
        }

        // Create actual User
        const user = await User.create({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password,
            phoneNumber: pendingUser.phoneNumber,
        });

        // Delete pending record
        await PendingUser.deleteOne({ email });

        // Generate Token & Login
        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: config.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });

        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (user.password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        } else {
            // Handle Google Auth users who don't have a password
            return res.status(400).json({ message: "Please login with Google" });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: config.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

exports.logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out" });
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const crypto = require("crypto");

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Hash and set to resetPasswordToken
        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Set expire (10 minutes)
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;

        const message = `
        <h1>Password Reset Request</h1>
        <p>You have requested to reset your password.</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
        <p>This link expires in 10 minutes.</p>
        `;

        try {
            await sendEmail(user.email, "Password Reset - Kriscap Education", message);
            res.status(200).json({ message: "Email sent" });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ message: "Email could not be sent" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.resetToken)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Set new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
