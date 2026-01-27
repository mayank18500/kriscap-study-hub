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
        const { products, phoneNumber, addressId } = req.body; // Expect products: [{ product: ID, quantity: 1 }]
        const userId = req.userId;

        if (!products || !Array.isArray(products) || products.length === 0) {
            // Fallback for legacy single-product calls (if any remain) or error
            if (req.body.productId) {
                return exports.createOrderLegacy(req, res);
            }
            return res.status(400).json({ message: "No products provided" });
        }

        const productIds = products.map(p => p.product);
        const dbProducts = await Product.find({ _id: { $in: productIds } });

        if (dbProducts.length !== productIds.length) {
            return res.status(404).json({ message: "One or more products not found" });
        }

        let totalAmount = 0;
        let requiresShipping = false;
        const orderProducts = [];

        // Calculate total and check types
        for (const item of products) {
            const dbProduct = dbProducts.find(p => p._id.toString() === item.product);
            if (!dbProduct) continue; // Should be caught above but safe check

            totalAmount += dbProduct.price * (item.quantity || 1);
            orderProducts.push({
                product: dbProduct._id,
                priceAtPurchase: dbProduct.price
            });

            if (dbProduct.type === "PROJECT") {
                requiresShipping = true;
            }
        }

        let shippingAddress;
        if (requiresShipping) {
            // Apply Fixed Delivery Charge
            totalAmount += 150;

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: "User not found" });

            if (!user.addresses || user.addresses.length === 0) {
                return res.status(400).json({
                    message: "Shipping address required for physical orders",
                    code: "ADDRESS_REQUIRED"
                });
            }
            shippingAddress = user.addresses[user.addresses.length - 1]; // Use latest
        }

        // Create Razorpay Order
        const options = {
            amount: totalAmount * 100, // amount in paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        if (!razorpay) {
            return res.status(503).json({
                message: "Payment system is currently unavailable (Configuration Error).",
                code: "PAYMENT_CONFIG_ERROR"
            });
        }

        const razorpayOrder = await razorpay.orders.create(options);

        // Create Internal Order
        const order = await Order.create({
            user: userId,
            products: orderProducts,
            totalAmount: totalAmount,
            razorpayOrderId: razorpayOrder.id,
            status: "Pending",
            paymentStatus: "Pending",
            shippingAddress: shippingAddress,
            phoneNumber: phoneNumber
        });

        res.json({
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderId: order._id,
            keyId: config.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Legacy support helper (optional, kept inline or separated if needed, but for now assuming we migrate all)
exports.createOrderLegacy = async (req, res) => {
    // ... Copy of old logic or just Error out. 
    // Given we are updating both files, we can probably skip strict legacy support if we update TmaFiles.tsx immediately.
    // But for safety, let's map it to the new logic.
    const { productId, phoneNumber } = req.body;
    req.body.products = [{ product: productId, quantity: 1 }];
    return exports.createOrder(req, res);
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

        const productsHtml = order.products.map(p =>
            `<tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${p.product?.name || "Unknown Product"}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${p.product?.type || "-"}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${p.priceAtPurchase}</td>
            </tr>`
        ).join("");

        const subtotal = order.products.reduce((acc, p) => acc + p.priceAtPurchase, 0);
        const deliveryFee = order.totalAmount - subtotal;

        const invoiceHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #eee;">
                <h1>Invoice</h1>
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Customer:</strong> ${order.user.name} (${order.user.email})</p>
                
                ${order.shippingAddress ? `
                <div style="margin-top: 20px;">
                    <strong>Shipping Address:</strong><br/>
                    ${order.shippingAddress.addressLine1}<br/>
                    ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br/>
                    Phone: ${order.phoneNumber}
                </div>` : ''}

                <h3 style="margin-top: 30px;">Order Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background-color: #f9f9f9; text-align: left;">
                            <th style="padding: 8px; border-bottom: 2px solid #ddd;">Product</th>
                             <th style="padding: 8px; border-bottom: 2px solid #ddd;">Type</th>
                            <th style="padding: 8px; border-bottom: 2px solid #ddd;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productsHtml}
                    </tbody>
                </table>

                <div style="text-align: right;">
                    <p>Subtotal: ₹${subtotal}</p>
                    ${deliveryFee > 0 ? `<p>Delivery Fee: ₹${deliveryFee}</p>` : ''}
                    <h3>Total Amount: ₹${order.totalAmount}</h3>
                </div>

                <hr style="margin: 30px 0;"/>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Payment ID:</strong> ${order.razorpayPaymentId || "Pending"}</p>
            </div>
        `;

        res.send(invoiceHtml);
    } catch (error) {
        res.status(500).send("Error generating invoice");
    }
}
