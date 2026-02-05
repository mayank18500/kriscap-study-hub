const mongoose = require("mongoose");
const Order = require("./src/models/Order");
const User = require("./src/models/User");
const config = require("./src/config/env");

mongoose.connect(config.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB for Check");

        // Find recent orders (last 24 hours) that are Pending
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        try {
            const pendingOrders = await Order.find({
                createdAt: { $gte: twentyFourHoursAgo },
                paymentStatus: "Pending"
            }).populate("user", "name email").populate("products.product", "name");

            console.log(`Found ${pendingOrders.length} pending orders in the last 24h:`);

            pendingOrders.forEach(order => {
                console.log("------------------------------------------------");
                console.log(`Order ID: ${order._id}`);
                console.log(`User: ${order.user?.name} (${order.user?.email})`);
                console.log(`Amount: ${order.totalAmount}`);
                console.log(`Razorpay Order ID: ${order.razorpayOrderId}`);
                console.log(`Created At: ${order.createdAt}`);
                console.log(`Products: ${order.products.map(p => p.product?.name).join(", ")}`);
                console.log("------------------------------------------------");
            });

        } catch (err) {
            console.error(err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch(err => {
        console.error("Connection Error:", err);
    });
