const mongoose = require("mongoose");
const Order = require("./src/models/Order");
require("dotenv").config(); // Using dotenv directly if config fails or just hardcode URI if needed for debugging

// Hardcode URI if import fails in script context often due to pathing
const MONGO_URI = "mongodb+srv://admin:admin123@cluster0.mongodb.net/kriscap?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB");

        try {
            // Check ALL orders first to ensure connection works
            const count = await Order.countDocuments();
            console.log(`Total Orders in DB: ${count}`);

            const orders = await Order.find({ paymentStatus: "Pending" })
                .sort({ createdAt: -1 })
                .limit(5);

            console.log(`Found ${orders.length} recent PENDING orders:`);
            orders.forEach(o => {
                console.log(`- ID: ${o._id} | User: ${o.user} | Amount: ${o.totalAmount} | Time: ${o.createdAt}`);
            });

        } catch (err) {
            console.error("Query Error:", err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.error(err));
