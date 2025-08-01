const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Prefer not to say", "Other"],
  },
  genderOther: {
    type: String,
    trim: true,
    default: "",
  },
  ethnicity: {
    type: String,
    enum: [
      "Hispanic or Latino",
      "Black or African American",
      "White",
      "Asian",
      "Native American or Alaska Native",
      "Native Hawaiian or Other Pacific Islander",
      "Middle Eastern or North African",
      "South Asian",
      "East Asian",
      "Southeast Asian",
      "Indigenous",
      "Multiracial",
      "Other",
      "Prefer not to say",
    ],
  },
  ethnicityOther: {
    type: String,
    default: "",
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  cases: [
    {
      type: Schema.Types.ObjectId,
      ref: "Case",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", UserSchema);

module.exports = User;
