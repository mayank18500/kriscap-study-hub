const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Comment = require("../models/Comment");

exports.getAdminStats = async (req, res) => {
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
            const product = order.products[0]?.product;
            const user = order.user;
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

exports.getAdminProducts = async (req, res) => {
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
            description: p.description,
            description: p.description,
            category: p.category,
            copyrightStatus: p.copyrightStatus,
            stock: p.stock,
            offerPrice: p.offerPrice,
            sales: 0 // We would need to count this from orders ideally
        }));

        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, type, class: grade, medium, price, offerPrice, category, copyrightStatus, stock } = req.body;
        console.log("Create Product Request Body:", req.body); // Debug log
        // File handling would go here (e.g. S3 upload), for now assuming just data or fileUrl passed

        // Generate random rating between 4.5 and 4.9
        const randomRating = (Math.random() * (4.9 - 4.5) + 4.5).toFixed(1);

        const product = await Product.create({
            name,
            description,
            type,
            class: grade,
            medium,
            price,
            offerPrice: offerPrice || 0,
            stock: stock || 0,
            active: true,
            rating: Number(randomRating),
            fileUrl: req.body.fileUrl || "",
            previewUrl: req.body.previewUrl || "",
            category: type === "TMA" ? category : undefined,
            copyrightStatus: type === "TMA" ? copyrightStatus : undefined
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, type, class: grade, medium, price, offerPrice, fileUrl, previewUrl, category, copyrightStatus, stock } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                type,
                class: grade,
                medium,
                price,
                offerPrice,
                stock,
                fileUrl,
                previewUrl,
                category: type === "TMA" ? category : undefined,
                copyrightStatus: type === "TMA" ? copyrightStatus : undefined
            },
            { new: true }
        );

        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

exports.toggleProductStatus = async (req, res) => {
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

exports.getAdminOrders = async (req, res) => {
    try {
        const orders = await Order.find({ paymentStatus: "Paid" })
            .populate("user", "name email phoneNumber addresses")
            .populate("products.product", "name type")
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map(order => {
            const user = order.user;
            // Use order shipping address if available, fallback to user's default address
            const shippingAddress = order.shippingAddress || (user.addresses && user.addresses[0]);

            // Map all products
            const productsList = order.products.map(p => ({
                name: p.product?.name || "Unknown Product",
                type: p.product?.type || "Unknown",
                price: p.priceAtPurchase
            }));

            return {
                id: order._id,
                customer: user?.name,
                email: user?.email,
                phone: order.phoneNumber || user?.phoneNumber,
                // Primary type logic: if any physical -> Project, else if any TMA -> TMA
                type: productsList.some(p => p.type === "PROJECT") ? "PROJECT" : "TMA",
                // Summary string for table display (e.g., "Physics Lab + 2 others")
                product: productsList.length > 1
                    ? `${productsList[0].name} + ${productsList.length - 1} more`
                    : productsList[0]?.name || "Empty Order",
                // Full products list for detail view
                products: productsList,
                amount: order.totalAmount,
                status: order.status,
                date: order.createdAt,
                shippingAddress: shippingAddress,
                paymentStatus: order.paymentStatus,
                razorpayPaymentId: order.razorpayPaymentId
            };
        });

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateOrderStatus = async (req, res) => {
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

exports.getAdminUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAdminPayments = async (req, res) => {
    try {
        const orders = await Order.find({
            status: { $in: ["Completed", "Processing", "In Transit", "Delivered"] }
        })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        const payments = orders.map(order => ({
            id: order.razorpayPaymentId || `PAY-${order._id.toString().slice(-6)}`, // Using paymentId if exists, else fallback
            orderId: order._id,
            user: order.user?.name || "Unknown",
            email: order.user?.email,
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


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAdminComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        const formattedComments = comments.map(c => ({
            id: c._id,
            user: c.user ? c.user.name : "Unknown",
            email: c.user ? c.user.email : "",
            text: c.text,
            isVisible: c.isVisible,
            date: c.createdAt
        }));

        res.json(formattedComments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.toggleCommentVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        comment.isVisible = !comment.isVisible;
        await comment.save();

        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


exports.deleteAdminComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

