const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    case: {
        type: Schema.Types.ObjectId,
        ref: "Case",
        required: true,
    },

}, { timestamps: true });

const Note = model("Note", noteSchema);

module.exports = Note;