import { Request, Response } from "express";
import User from "../models/User";
import Order from "../models/Order";
import Product from "../models/Product";

export const getAdminStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalOrders = await Order.countDocuments();

        // Revenue Calculation
        const orders = await Order.find({ status: "Completed" });
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        // Pending Deliveries
        const pendingDeliveries = await Order.countDocuments({ status: { $in: ["Pending", "Processing", "In Transit"] } });

        // Today's Orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaysOrders = await Order.countDocuments({ createdAt: { $gte: today } });

        // Recent Orders
        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name").populate("products.product", "name type");

        // Simple Monthly Revenue Aggregation (Mock logic for now as we might not have much data)
        // In a real app, use MongoDB aggregation framework
        const revenueData = [
            { name: "Jan", revenue: 0 }, { name: "Feb", revenue: 0 }, { name: "Mar", revenue: 0 },
            { name: "Apr", revenue: 0 }, { name: "May", revenue: 0 }, { name: "Jun", revenue: 0 },
            { name: "Jul", revenue: 0 }, { name: "Aug", revenue: 0 }, { name: "Sep", revenue: 0 },
            { name: "Oct", revenue: 0 }, { name: "Nov", revenue: 0 }, { name: "Dec", revenue: 0 }
        ];

        // Format recent orders for frontend
        const formattedRecentOrders = recentOrders.map(order => {
            const product = order.products[0]?.product as any;
            const user = order.user as any;
            return {
                id: order._id,
                customer: user?.name || "Unknown",
                type: product?.type || "Unknown",
                amount: order.totalAmount,
                status: order.status
            };
        });

        res.json({
            stats: {
                totalRevenue,
                todaysOrders,
                pendingDeliveries,
                totalUsers
            },
            revenueData,
            recentOrders: formattedRecentOrders
        });
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAdminProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        // Format for frontend
        const formattedProducts = products.map(p => ({
            id: p._id,
            name: p.name,
            type: p.type,
            class: p.class,
            medium: p.medium,
            price: p.price,
            active: p.active,
            sales: 0 // We would need to count this from orders ideally
        }));

        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, type, class: grade, medium, price } = req.body;
        // File handling would go here (e.g. S3 upload), for now assuming just data or fileUrl passed

        const product = await Product.create({
            name,
            type,
            class: grade,
            medium,
            price,
            active: true,
            fileUrl: req.body.fileUrl || "",
            previewUrl: req.body.previewUrl || ""
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const toggleProductStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        product.active = !product.active;
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const getAdminOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ paymentStatus: "Paid" })
            .populate("user", "name email phoneNumber addresses")
            .populate("products.product", "name type")
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map(order => {
            const product = order.products[0]?.product as any;
            const user = order.user as any;
            // Use order shipping address if available, fallback to user's default address
            const shippingAddress = order.shippingAddress || (user.addresses && user.addresses[0]);

            return {
                id: order._id,
                customer: user?.name,
                email: user?.email,
                phone: user?.phoneNumber,
                type: product?.type,
                product: product?.name,
                amount: order.totalAmount,
                status: order.status,
                date: order.createdAt,
                shippingAddress: shippingAddress,
                razorpayPaymentId: order.razorpayPaymentId
            };
        });

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const getAdminUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAdminPayments = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({
            status: { $in: ["Completed", "Processing", "In Transit", "Delivered"] }
        })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        const payments = orders.map(order => ({
            id: order.razorpayPaymentId || `PAY-${order._id.toString().slice(-6)}`, // Using paymentId if exists, else fallback
            orderId: order._id,
            user: (order.user as any)?.name || "Unknown",
            email: (order.user as any)?.email,
            amount: order.totalAmount,
            status: "Success",
            date: order.createdAt,
            method: "Razorpay"
        }));

        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const uploadFile = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    // Cloudinary storage automatically puts the URL in req.file.path
    const fileUrl = req.file.path;
    res.json({ fileUrl });
};
