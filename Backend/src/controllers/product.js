const prisma = require("../config/prisma");

exports.getProducts = async (req, res) => {
    try {
        const { type } = req.query;
        const filter = {};

        if (type) {
            filter.type = type;
        }

        const products = await prisma.product.findMany({ where: filter });
        res.json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id }
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Error getting product by id:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
