const { Schema, model } = require("mongoose");

const caseSchema = new Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    offense: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "closed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low","medium", "high"],
      default: "undefined",
    },
    dateOpened:
    {
      type: Date,
      required: true,
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
      },
    ],
    progressEntries: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProgressEntry",
      }
    ],
  },
  { timestamps: true }
);

const Case = model("Case", caseSchema);

module.exports = Case;
