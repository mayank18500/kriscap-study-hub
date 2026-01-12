import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    type: "TMA" | "PROJECT";
    class: string; // "10" | "12"
    subject?: string;
    medium?: string; // "English" | "Hindi"
    fileUrl?: string; // For digital downloads (TMA)
    previewUrl?: string;
    isPhysical: boolean; // True for Projects
    active: boolean;
    rating: number;
    reviews: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        type: { type: String, enum: ["TMA", "PROJECT"], required: true },
        class: { type: String, required: true },
        subject: { type: String },
        medium: { type: String },
        fileUrl: { type: String },
        previewUrl: { type: String },
        isPhysical: { type: Boolean, default: false },
        active: { type: Boolean, default: true },
        rating: { type: Number, default: 0 },
        reviews: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
