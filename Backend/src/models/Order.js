const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
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

module.exports = mongoose.model("Order", OrderSchema);
