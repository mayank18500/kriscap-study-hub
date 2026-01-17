const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const config = require("../config/env");

let razorpay;
try {
    if (config.RAZORPAY_KEY_ID && config.RAZORPAY_KEY_SECRET) {
        razorpay = new Razorpay({
            key_id: config.RAZORPAY_KEY_ID,
            key_secret: config.RAZORPAY_KEY_SECRET,
        });
    } else {
        console.warn("Skipping Razorpay initialization: Missing keys");
    }
} catch (error) {
    console.error("Razorpay Config Error:", error);
}

exports.createOrder = async (req, res) => {
    try {
        const { productId, addressId } = req.body; // addressId might be 'latest' or specific ID
        const userId = req.userId;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const price = product.price;

        let shippingAddress;
        // Check for Physical Order Requirements
        if (product.type === "PROJECT") {
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found" });

            if (!user.addresses || user.addresses.length === 0) {
                return res.status(400).json({
                    message: "Shipping address required for Project orders",
                    code: "ADDRESS_REQUIRED"
                });
            }
            shippingAddress = user.addresses[user.addresses.length - 1]; // Use latest
        }

        // Create Razorpay Order
        const options = {
            amount: price * 100, // amount in paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };


        if (!razorpay) {
            return res.status(503).json({
                message: "Payment system is currently unavailable (Configuration Error).",
                code: "PAYMENT_CONFIG_ERROR"
            });
        }

        // Debug Log (Safe)
        console.log("Creating Razorpay Order...");

        const razorpayOrder = await razorpay.orders.create(options);

        // Create Internal Order
        const order = await Order.create({
            user: userId,
            products: [{ product: productId, priceAtPurchase: price }],
            totalAmount: price,
            razorpayOrderId: razorpayOrder.id,
            status: "Pending",
            paymentStatus: "Pending",
            shippingAddress: shippingAddress,
            phoneNumber: req.body.phoneNumber // Save phone number from request
        });

        res.json({
            id: razorpayOrder.id, // Client uses this to open checkout
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderId: order._id, // Internal ID
            keyId: config.RAZORPAY_KEY_ID // Send public key to frontend
        });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.userId;

        if (!config.RAZORPAY_KEY_SECRET) {
            return res.status(503).json({ message: "Payment verification unavailable" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
            if (!order) return res.status(404).json({ message: "Order not found" });

            order.paymentStatus = "Paid";
            order.razorpayPaymentId = razorpay_payment_id;
            order.razorpaySignature = razorpay_signature;

            // Check product type to set status
            // We need to fetch product to check type
            await order.populate("products.product");
            const product = order.products[0].product;

            // Late require to avoid circular dependency
            const { io } = require("../index");

            if (product.type === "TMA") {
                order.status = "Completed";
                // Emit file unlocked event
                if (io) {
                    io.to(userId).emit("file_unlocked", {
                        fileName: product.name,
                        orderId: order._id
                    });
                }
            } else {
                order.status = "Pending"; // Waiting for shipping
            }

            await order.save();

            // Emit global/user socket event
            if (io) {
                io.emit("payment_success", { orderId: order._id, userId });
                io.emit("order_status_update", { orderId: order._id, status: order.status });
            }

            res.json({ message: "Payment verified successfully", orderId: order._id });
        } else {
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Verify Payment Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ user: userId }).populate("products.product").sort({ createdAt: -1 });

        // Transform for frontend
        const formattedOrders = orders.map(order => {
            const product = order.products[0]?.product;
            return {
                id: order._id,
                type: product?.type || "Unknown",
                name: product?.name || "Product Deleted",
                status: order.status,
                date: order.createdAt,
                price: order.totalAmount,
                tracking: order.trackingId
            };
        });

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getInvoice = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("user products.product");
        if (!order) return res.status(404).send("Order not found");

        const product = order.products[0].product;
        const user = order.user;

        const invoiceHtml = `
            <h1>Invoice</h1>
            <p>Order ID: ${order._id}</p>
            <p>Date: ${order.createdAt}</p>
            <p>Customer: ${user.name} (${user.email})</p>
            <hr/>
            <h3>Details</h3>
            <p>Product: ${product.name}</p>
            <p>Amount: ₹${order.totalAmount}</p>
            <p>Status: ${order.status}</p>
            <p>Payment ID: ${order.razorpayPaymentId}</p>
        `;

        res.send(invoiceHtml);
    } catch (error) {
        res.status(500).send("Error generating invoice");
    }
}
