const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const ensureAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const email = "admin@kriscap.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.error("User not found:", email);
            process.exit(1);
        }

        console.log(`User found. Current Role: ${user.role}`);

        if (user.role !== "admin") {
            user.role = "admin";
            await user.save();
            console.log("Updated user role to 'admin'.");
        } else {
            console.log("User is already admin.");
        }

        mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

ensureAdmin();
