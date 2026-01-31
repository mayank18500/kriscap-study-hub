const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true, trim: true, maxlength: 500 },
        isVisible: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
