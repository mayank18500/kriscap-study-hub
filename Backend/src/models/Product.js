const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        offerPrice: { type: Number, default: 0 },
        type: { type: String, enum: ["TMA", "PROJECT"], required: true },
        class: { type: String, required: true },
        subject: { type: String },
        medium: { type: String },
        fileUrl: { type: String },
        previewUrl: { type: String },
        category: { type: String, enum: ["TEXT", "HANDWRITTEN"] },
        copyrightStatus: { type: String, enum: ["COPYRIGHT", "NON_COPYRIGHT"], default: "NON_COPYRIGHT" },
        stock: { type: Number, required: true, default: 0 },
        isPhysical: { type: Boolean, default: false },
        active: { type: Boolean, default: true },
        rating: { type: Number, default: 0 },
        reviews: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
