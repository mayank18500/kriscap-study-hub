const prisma = require("../config/prisma");

exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: "desc" }
        });

        // Simplified stats calculation
        const tmaPurchased = orders.filter(o => o.status === 'Completed').length;
        const projectOrders = orders.length; 
        const totalDownloads = 0; 
        const pendingDeliveries = orders.filter(o => o.status === 'In_Transit' || o.status === 'Pending').length;

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
        console.error("Error in getDashboardStats:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.saveAddress = async (req, res) => {
    try {
        const { addresses } = req.body;
        const userId = req.userId;

        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Replace all addresses for the user
        await prisma.address.deleteMany({ where: { userId } });
        
        if (addresses && addresses.length > 0) {
            await prisma.address.createMany({
                data: addresses.map(a => ({
                    addressLine1: a.addressLine1,
                    city: a.city,
                    state: a.state,
                    pincode: a.pincode,
                    isDefault: a.isDefault || false,
                    userId
                }))
            });
        }

        const user = await prisma.user.findUnique({ 
            where: { id: userId },
            include: { addresses: true }
        });

        res.json(user);
    } catch (error) {
        console.error("Error saving address:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phoneNumber } = req.body; 
        const userId = req.userId;

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = {};
        if (name) data.name = name;
        if (phoneNumber) data.phoneNumber = phoneNumber;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
            include: { addresses: true }
        });

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getDownloads = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await prisma.order.findMany({
            where: { userId, status: "Completed" },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: "desc" }
        });

        const downloads = orders.flatMap(order => {
            if (!order.items || order.items.length === 0) return [];

            return order.items
                .filter(item => item.product.type === "TMA")
                .map(item => ({
                    id: item.product.id,
                    name: item.product.name,
                    date: order.createdAt,
                    size: "2 MB", 
                    downloads: item.product.downloads || 0,
                    fileUrl: item.product.fileUrl
                }));
        });

        res.json(downloads);
    } catch (error) {
        console.error("Error getting downloads:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
