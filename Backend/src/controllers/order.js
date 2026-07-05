const Razorpay = require("razorpay");
const crypto = require("crypto");
const prisma = require("../config/prisma");
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
        const { products, phoneNumber, addressId } = req.body; 
        const userId = req.userId;

        if (!products || !Array.isArray(products) || products.length === 0) {
            if (req.body.productId) {
                return exports.createOrderLegacy(req, res);
            }
            return res.status(400).json({ message: "No products provided" });
        }

        const productIds = products.map(p => p.product);
        const dbProducts = await prisma.product.findMany({
            where: { id: { in: productIds } }
        });

        if (dbProducts.length !== productIds.length) {
            return res.status(404).json({ message: "One or more products not found" });
        }

        let totalAmount = 0;
        let requiresShipping = false;
        const orderProducts = [];

        for (const item of products) {
            const dbProduct = dbProducts.find(p => p.id === item.product);
            if (!dbProduct) continue; 

            const effectivePrice = (dbProduct.offerPrice && dbProduct.offerPrice > 0) ? dbProduct.offerPrice : dbProduct.price;

            totalAmount += effectivePrice * (item.quantity || 1);
            orderProducts.push({
                product: dbProduct.id,
                priceAtPurchase: effectivePrice
            });

            if (dbProduct.type === "PROJECT") {
                requiresShipping = true;
            }

            if (dbProduct.stock < (item.quantity || 1)) {
                return res.status(400).json({
                    message: `Out of stock: ${dbProduct.name}`,
                    code: "OUT_OF_STOCK"
                });
            }
        }

        let shippingAddress;
        if (requiresShipping) {
            totalAmount += 150;

            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: { addresses: true }
            });
            if (!user) return res.status(404).json({ message: "User not found" });

            if (!user.addresses || user.addresses.length === 0) {
                return res.status(400).json({
                    message: "Shipping address required for physical orders",
                    code: "ADDRESS_REQUIRED"
                });
            }
            shippingAddress = user.addresses[user.addresses.length - 1]; 
        }

        const options = {
            amount: totalAmount * 100, 
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

        console.log("Creating Order for user:", userId);
        const order = await prisma.order.create({
            data: {
                userId: userId,
                totalAmount: totalAmount,
                razorpayOrderId: razorpayOrder.id,
                status: "Pending",
                paymentStatus: "Pending",
                shippingAddress: shippingAddress ? shippingAddress : null,
                phoneNumber: phoneNumber,
                items: {
                    create: orderProducts.map(p => ({
                        productId: p.product,
                        priceAtPurchase: p.priceAtPurchase
                    }))
                }
            }
        });
        console.log("Order Created:", order.id);

        res.json({
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderId: order.id,
            keyId: config.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.createOrderLegacy = async (req, res) => {
    const { productId, phoneNumber } = req.body;
    req.body.products = [{ product: productId, quantity: 1 }];
    return exports.createOrder(req, res);
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log("Verifying Payment for Order:", razorpay_order_id);
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
            const order = await prisma.order.findFirst({ 
                where: { razorpayOrderId: razorpay_order_id },
                include: { items: { include: { product: true } } }
            });
            
            if (!order) {
                console.error("Order not found during verification:", razorpay_order_id);
                return res.status(404).json({ message: "Order not found" });
            }

            console.log("Payment Verified for Order:", order.id);
            let newStatus = "Pending";
            
            const product = order.items[0]?.product;

            const { io } = require("../index");

            if (product && product.type === "TMA") {
                newStatus = "Completed";
                if (io) {
                    io.to(userId).emit("file_unlocked", {
                        fileName: product.name,
                        orderId: order.id
                    });
                }
            }

            await prisma.order.update({
                where: { id: order.id },
                data: {
                    paymentStatus: "Paid",
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    status: newStatus
                }
            });

            for (const item of order.items) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: 1 } }
                });
            }

            if (io) {
                io.emit("payment_success", { orderId: order.id, userId });
                io.emit("order_status_update", { orderId: order.id, status: newStatus });
            }

            res.json({ message: "Payment verified successfully", orderId: order.id });
        } else {
            console.error("Invalid Signature for Order:", razorpay_order_id);
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Verify Payment Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: "desc" }
        });

        const formattedOrders = orders.map(order => {
            const product = order.items[0]?.product;
            return {
                id: order.id,
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
        console.error("Get Orders error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getInvoice = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { user: true, items: { include: { product: true } } }
        });
        
        if (!order) return res.status(404).send("Order not found");

        const productsHtml = order.items.map(p =>
            `<tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${p.product?.name || "Unknown Product"}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${p.product?.type || "-"}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${p.priceAtPurchase}</td>
            </tr>`
        ).join("");

        const subtotal = order.items.reduce((acc, p) => acc + p.priceAtPurchase, 0);
        const deliveryFee = order.totalAmount - subtotal;
        
        let addr = order.shippingAddress;
        if (typeof addr === 'string') {
            try { addr = JSON.parse(addr); } catch(e) {}
        }

        const invoiceHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #eee;">
                <h1>Invoice</h1>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Customer:</strong> ${order.user.name} (${order.user.email})</p>
                
                ${addr ? `
                <div style="margin-top: 20px;">
                    <strong>Shipping Address:</strong><br/>
                    ${addr.addressLine1 || ""}<br/>
                    ${addr.city || ""}, ${addr.state || ""} - ${addr.pincode || ""}<br/>
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
        console.error("Invoice Error:", error);
        res.status(500).send("Error generating invoice");
    }
};
