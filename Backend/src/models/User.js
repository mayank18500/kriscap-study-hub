const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String }, // Optional for Google Auth later
        role: { type: String, enum: ["user", "admin"], default: "user" },
        phoneNumber: { type: String },
        addresses: [
            {
                addressLine1: { type: String },
                city: { type: String },
                state: { type: String },
                pincode: { type: String },
                isDefault: { type: Boolean, default: false },
            },
        ],
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
