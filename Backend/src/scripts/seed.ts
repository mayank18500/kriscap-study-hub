import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";
import User from "../models/User";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kriscap_education";

const products = [
    // Class 12 TMAs
    {
        name: "Mathematics Class 12 TMA",
        description: "Solved TMA for Mathematics (311) Session 2023-24",
        price: 199,
        type: "TMA",
        class: "12",
        subject: "Mathematics",
        medium: "English",
        fileUrl: "https://example.com/math-12-tma.pdf",
        previewUrl: "https://example.com/math-12-preview.pdf",
        isPhysical: false,
        active: true,
    },
    {
        name: "Physics Class 12 TMA",
        description: "Solved TMA for Physics (312) Session 2023-24",
        price: 199,
        type: "TMA",
        class: "12",
        subject: "Physics",
        medium: "English",
        fileUrl: "https://example.com/physics-12-tma.pdf",
        isPhysical: false,
    },
    {
        name: "Chemistry Class 12 TMA",
        description: "Solved TMA for Chemistry (313) Session 2023-24",
        price: 199,
        type: "TMA",
        class: "12",
        subject: "Chemistry",
        medium: "English",
        fileUrl: "https://example.com/chemistry-12-tma.pdf",
        isPhysical: false,
    },

    // Class 10 TMAs
    {
        name: "Science Class 10 TMA",
        description: "Solved TMA for Science (212) Session 2023-24",
        price: 149,
        type: "TMA",
        class: "10",
        subject: "Science",
        medium: "English",
        fileUrl: "https://example.com/science-10-tma.pdf",
        isPhysical: false,
    },

    // Projects
    {
        name: "Physics Investigatory Project",
        description: "Complete physical project file for Class 12 Physics",
        price: 499,
        type: "PROJECT",
        class: "12",
        rating: 4.9,
        reviews: 45,
        isPhysical: true,
    },
    {
        name: "Chemistry Investigatory Project",
        description: "Complete physical project file for Class 12 Chemistry",
        price: 499,
        type: "PROJECT",
        class: "12",
        rating: 4.8,
        reviews: 38,
        isPhysical: true,
    },
    {
        name: "Biology Investigatory Project",
        description: "Complete physical project file for Class 12 Biology",
        price: 499,
        type: "PROJECT",
        class: "12",
        rating: 4.9,
        reviews: 42,
        isPhysical: true,
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for seeding");

        await Product.deleteMany({});
        console.log("Cleared existing products");

        await Product.insertMany(products);
        console.log("Seeded products");

        // Seed Users
        await User.deleteMany({});
        await User.collection.dropIndexes(); // Clear legacy indexes like clerkId
        console.log("Cleared existing users and indexes");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);

        const adminUser = new User({
            name: "Admin User",
            email: "admin@kriscap.com",
            password: hashedPassword,
            role: "admin",
            addresses: []
        });

        const clientUser = new User({
            name: "Test Client",
            email: "client@test.com",
            password: hashedPassword,
            role: "user",
            addresses: []
        });

        await adminUser.save();
        await clientUser.save();
        console.log("Seeded users (admin@kriscap.com / client@test.com)");

        mongoose.disconnect();

        console.log("Disconnected");
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedDB();
