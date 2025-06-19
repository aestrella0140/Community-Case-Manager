const { Schema, model } = require("mongoose");

const progressEntrySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["completed", "missed", "in progress"]
    },
    case: {
        type: Schema.Types.ObjectId,
        ref: "Case",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const ProgressEntry = model("ProgressEntry", progressEntrySchema);

module.exports = ProgressEntry;