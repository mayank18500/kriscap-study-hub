import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: "user" | "admin";
    phoneNumber?: string;
    addresses: Array<{
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
        isDefault?: boolean;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
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
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
