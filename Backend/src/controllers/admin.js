const prisma = require("../config/prisma");

exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await prisma.user.count({ where: { role: "USER" } });
        const totalOrders = await prisma.order.count();

        // Revenue Calculation
        const revenueAgg = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { status: "Completed" }
        });
        const totalRevenue = revenueAgg._sum.totalAmount || 0;

        // Pending Deliveries
        const pendingDeliveries = await prisma.order.count({ 
            where: { status: { in: ["Pending", "In_Transit"] } } 
        });

        // Today's Orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaysOrders = await prisma.order.count({ 
            where: { createdAt: { gte: today } } 
        });

        // Recent Orders
        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { user: { select: { name: true } }, items: { include: { product: { select: { name: true, type: true } } } } }
        });

        const revenueData = [
            { name: "Jan", revenue: 0 }, { name: "Feb", revenue: 0 }, { name: "Mar", revenue: 0 },
            { name: "Apr", revenue: 0 }, { name: "May", revenue: 0 }, { name: "Jun", revenue: 0 },
            { name: "Jul", revenue: 0 }, { name: "Aug", revenue: 0 }, { name: "Sep", revenue: 0 },
            { name: "Oct", revenue: 0 }, { name: "Nov", revenue: 0 }, { name: "Dec", revenue: 0 }
        ];

        const formattedRecentOrders = recentOrders.map(order => {
            const product = order.items[0]?.product;
            const user = order.user;
            return {
                id: order.id,
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
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAdminProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

        const formattedProducts = products.map(p => ({
            id: p.id,
            name: p.name,
            type: p.type,
            class: p.class,
            medium: p.medium,
            price: p.price,
            active: p.active,
            description: p.description,
            category: p.category,
            copyrightStatus: p.copyrightStatus,
            stock: p.stock,
            offerPrice: p.offerPrice,
            isPhysical: p.isPhysical,
            sales: 0 
        }));

        res.json(formattedProducts);
    } catch (error) {
        console.error("Get Admin Products Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, type, class: grade, medium, price, offerPrice, category, copyrightStatus, stock, isPhysical } = req.body;
        console.log("Create Product Request Body:", req.body); 

        const randomRating = (Math.random() * (4.9 - 4.5) + 4.5).toFixed(1);

        const product = await prisma.product.create({
            data: {
                name,
                description,
                type,
                class: grade,
                medium,
                price: Number(price),
                offerPrice: offerPrice ? Number(offerPrice) : 0,
                stock: stock ? Number(stock) : 0,
                active: true,
                rating: Number(randomRating),
                fileUrl: req.body.fileUrl || "",
                previewUrl: req.body.previewUrl || "",
                category: type === "TMA" ? category : null,
                copyrightStatus: copyrightStatus || "NON_COPYRIGHT",
                isPhysical: isPhysical === true || isPhysical === 'true'
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, type, class: grade, medium, price, offerPrice, fileUrl, previewUrl, category, copyrightStatus, stock, isPhysical } = req.body;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                type,
                class: grade,
                medium,
                price: Number(price),
                offerPrice: offerPrice ? Number(offerPrice) : 0,
                stock: stock ? Number(stock) : 0,
                fileUrl,
                previewUrl,
                category: type === "TMA" ? category : null,
                copyrightStatus: copyrightStatus || "NON_COPYRIGHT",
                isPhysical: isPhysical === true || isPhysical === 'true'
            }
        });

        res.json(product);
    } catch (error) {
        if (error.code === 'P2025') return res.status(404).json({ message: "Product not found" });
        console.error("Update Product Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.toggleProductStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await prisma.product.findUnique({ where: { id } });
        if (!existing) return res.status(404).json({ message: "Product not found" });

        const product = await prisma.product.update({
            where: { id },
            data: { active: !existing.active }
        });
        
        res.json(product);
    } catch (error) {
        console.error("Toggle Product Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAdminOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { paymentStatus: "Paid" },
            include: { user: { include: { addresses: true } }, items: { include: { product: true } } },
            orderBy: { createdAt: "desc" }
        });

        const formattedOrders = orders.map(order => {
            const user = order.user;
            
            let shippingAddress = order.shippingAddress;
            if (typeof shippingAddress === 'string') {
                try { shippingAddress = JSON.parse(shippingAddress); } catch(e) {}
            }
            if (!shippingAddress && user?.addresses?.length > 0) {
                shippingAddress = user.addresses[0];
            }

            const productsList = order.items.map(p => ({
                name: p.product?.name || "Unknown Product",
                type: p.product?.type || "Unknown",
                price: p.priceAtPurchase
            }));

            return {
                id: order.id,
                customer: user?.name,
                email: user?.email,
                phone: order.phoneNumber || user?.phoneNumber,
                type: productsList.some(p => p.type === "PROJECT") ? "PROJECT" : "TMA",
                product: productsList.length > 1
                    ? `${productsList[0].name} + ${productsList.length - 1} more`
                    : productsList[0]?.name || "Empty Order",
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
        console.error("Get Admin Orders Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await prisma.order.update({
            where: { id },
            data: { status }
        });

        res.json(order);
    } catch (error) {
        if (error.code === 'P2025') return res.status(404).json({ message: "Order not found" });
        console.error("Update Order Status Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAdminUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: { role: "USER" },
            orderBy: { createdAt: "desc" }
        });
        res.json(users);
    } catch (error) {
        console.error("Get Admin Users Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAdminPayments = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { status: { in: ["Completed", "In_Transit", "Delivered"] } },
            include: { user: true },
            orderBy: { createdAt: "desc" }
        });

        const payments = orders.map(order => ({
            id: order.razorpayPaymentId || `PAY-${order.id.slice(-6)}`, 
            orderId: order.id,
            user: order.user?.name || "Unknown",
            email: order.user?.email,
            amount: order.totalAmount,
            status: "Success",
            date: order.createdAt,
            method: "Razorpay"
        }));

        res.json(payments);
    } catch (error) {
        console.error("Get Admin Payments Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id } });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        if (error.code === 'P2025') return res.status(404).json({ message: "User not found" });
        console.error("Delete User Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({ where: { id } });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        if (error.code === 'P2025') return res.status(404).json({ message: "Product not found" });
        console.error("Delete Product Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAdminComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: { user: { select: { name: true, email: true } } },
            orderBy: { createdAt: "desc" }
        });

        const formattedComments = comments.map(c => ({
            id: c.id,
            user: c.user ? c.user.name : "Unknown",
            email: c.user ? c.user.email : "",
            text: c.text,
            isVisible: c.isVisible,
            date: c.createdAt
        }));

        res.json(formattedComments);
    } catch (error) {
        console.error("Get Admin Comments Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.toggleCommentVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await prisma.comment.findUnique({ where: { id } });

        if (!existing) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const comment = await prisma.comment.update({
            where: { id },
            data: { isVisible: !existing.isVisible }
        });

        res.json(comment);
    } catch (error) {
        console.error("Toggle Comment Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteAdminComment = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.comment.delete({ where: { id } });
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        if (error.code === 'P2025') return res.status(404).json({ message: "Comment not found" });
        console.error("Delete Comment Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

