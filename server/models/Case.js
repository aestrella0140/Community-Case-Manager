const { Schema, model } = require("mongoose");

const caseSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "closed"],
      default: "pending",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Case = model("Case", caseSchema);

module.exports = Case;
