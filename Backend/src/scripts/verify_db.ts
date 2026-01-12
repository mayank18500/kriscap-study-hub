import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Product from "../models/Product";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kriscap_education";

const verify = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for verification");

        const userCount = await User.countDocuments();
        const adminCount = await User.countDocuments({ role: "admin" });
        const clientCount = await User.countDocuments({ role: "user" });
        const productCount = await Product.countDocuments();

        console.log(`Total Users: ${userCount}`);
        console.log(`Admins: ${adminCount}`);
        console.log(`Clients: ${clientCount}`);
        console.log(`Products: ${productCount}`);

        const users = await User.find({}, "name email role");
        console.log("Users found:", users);

        mongoose.disconnect();
    } catch (error) {
        console.error("Verification Error:", error);
    }
};

verify();
