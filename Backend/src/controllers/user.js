const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");

exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.userId;

        // Aggregations
        const orders = await Order.find({ user: userId });

        const tmaPurchased = orders.filter(o => {
            // Assuming we check products, but for now filtering simplistically or if we populate products
            // ideally we filter by 'type' inside population or check status
            return o.status === 'Completed';
        }).length; // This logic needs to be robust based on product type
        // Since Order schema doesn't duplicate product type, we might need to populate OR just count completed orders for now

        const projectOrders = orders.length; // Placeholder logic
        const totalDownloads = 0; // Placeholder
        const pendingDeliveries = orders.filter(o => o.status === 'In Transit' || o.status === 'Pending').length;

        res.json({
            stats: {
                tmaPurchased,
                projectOrders,
                totalDownloads,
                pendingDeliveries,
            },
            recentOrders: orders.slice(0, 5),
            welcomeMessage: {
                pendingDeliveryCount: pendingDeliveries,
                newFilesCount: 5, // Mock for now
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.saveAddress = async (req, res) => {
    try {
        const { addresses } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.addresses = addresses;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phoneNumber, email, password } = req.body; // Allow email/password update if needed
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        // if (email) user.email = email; // Generally requires email verification

        // Simple password update (should ideally be separate)
        if (password && password.length >= 6) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        // Return user without password
        const userWithoutPassword = await User.findById(req.userId).select("-password");
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getDownloads = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ user: userId, status: "Completed" }).populate("products.product").sort({ createdAt: -1 });

        const downloads = orders.flatMap(order => {
            // Safe check validation
            if (!order.products || order.products.length === 0) return [];

            const product = order.products[0].product;
            if (product && product.type === "TMA") {
                return {
                    id: product._id,
                    name: product.name,
                    date: order.createdAt,
                    size: "2 MB", // Mock size if not in schema
                    downloads: product.downloads || 0, // Mock if needed
                    fileUrl: product.fileUrl
                };
            }
            return [];
        });

        res.json(downloads);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
