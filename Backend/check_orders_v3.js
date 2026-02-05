const mongoose = require("mongoose");
const Order = require("./src/models/Order");

// Use the correct URI from the .env file I just read
const MONGO_URI = "mongodb+srv://expo_ecom:mayank@cluster0.7noujuw.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB Correctly");

        try {
            const count = await Order.countDocuments();
            console.log(`Total Orders in DB: ${count}`);

            const orders = await Order.find({ paymentStatus: "Pending" })
                .sort({ createdAt: -1 })
                .limit(5);

            console.log(`Found ${orders.length} recent PENDING orders:`);
            orders.forEach(o => {
                console.log(`------------------------------------------------`);
                console.log(`ID: ${o._id}`);
                console.log(`User: ${o.user}`); // Just ID for now since model mismatch possible
                console.log(`Amount: ${o.totalAmount}`);
                console.log(`Date: ${o.createdAt}`);
                console.log(`Razorpay Order: ${o.razorpayOrderId}`);
                console.log(`------------------------------------------------`);
            });

        } catch (err) {
            console.error("Query Error:", err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => console.error(err));
