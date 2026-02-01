const User = require("../models/User");
const Product = require("../models/Product");

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.userId);

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.userId);

        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
        await user.save();

        res.json({ message: "Product removed from wishlist", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("wishlist");
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
