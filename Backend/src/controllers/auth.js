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

const crypto = require("crypto");

exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate Secure Token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Save to PendingUser (upsert to handle retries)
        await PendingUser.findOneAndUpdate(
            { email },
            { name, email, password: hashedPassword, phoneNumber, verificationToken },
            { upsert: true, new: true }
        );

        // Verification Link
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
        const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

        // Send Email with Link
        await sendEmail(
            email,
            "Verify Your Email - Kriscap Education",
            `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome to Kriscap Education!</h2>
                <p>Please click the button below to verify your email address and complete your registration.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email</a>
                </div>
                <p style="color: #666; font-size: 14px;">Or copy and paste this link in your browser:</p>
                <p style="color: #666; font-size: 12px; word-break: break-all;">${verificationUrl}</p>
                <p>This link expires in 10 minutes.</p>
            </div>
            `
        );

        res.status(200).json({ message: "Verification email sent. Please check your inbox." });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const pendingUser = await PendingUser.findOne({ verificationToken: token });

        if (!pendingUser) {
            return res.status(400).json({ message: "Invalid or expired verification link. Please register again." });
        }

        // Create actual User
        const user = await User.create({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password,
            phoneNumber: pendingUser.phoneNumber,
        });

        // Delete pending record
        await PendingUser.deleteOne({ email: pendingUser.email });

        // Generate Token & Login
        const jwtToken = generateToken(user._id);

        res.cookie("token", jwtToken, {
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
            message: "Email verified successfully!"
        });
    } catch (error) {
        console.error("Verify Email Error:", error);
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

        const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:8080"}/reset-password/${resetToken}`;

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
