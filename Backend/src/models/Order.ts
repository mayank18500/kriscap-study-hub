import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    products: Array<{
        product: mongoose.Types.ObjectId;
        priceAtPurchase: number;
        // For specific requirement like 'Product' vs 'TMA'
    }>;
    totalAmount: number;
    status: "Pending" | "Completed" | "In Transit" | "Delivered" | "Cancelled";
    paymentStatus: "Pending" | "Paid" | "Failed";
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    shippingAddress?: {
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
    };
    trackingId?: string; // For physical orders
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                priceAtPurchase: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Pending", "Completed", "In Transit", "Delivered", "Cancelled"],
            default: "Pending",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        razorpayOrderId: { type: String },
        razorpayPaymentId: { type: String },
        razorpaySignature: { type: String },
        shippingAddress: {
            addressLine1: { type: String },
            city: { type: String },
            state: { type: String },
            pincode: { type: String },
        },
        trackingId: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
