const prisma = require("../config/prisma");

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        
        await prisma.user.update({
            where: { id: req.userId },
            data: {
                wishlist: {
                    connect: { id: productId }
                }
            }
        });

        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            include: { wishlist: true }
        });

        res.json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (error) {
        console.error("Add to Wishlist Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        
        await prisma.user.update({
            where: { id: req.userId },
            data: {
                wishlist: {
                    disconnect: { id: productId }
                }
            }
        });

        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            include: { wishlist: true }
        });

        res.json({ message: "Product removed from wishlist", wishlist: user.wishlist });
    } catch (error) {
        console.error("Remove from Wishlist Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            include: { wishlist: true }
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.wishlist);
    } catch (error) {
        console.error("Get Wishlist Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
