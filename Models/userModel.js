const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true,
    },
    middlename: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "staff", "admin", "worker"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    kycStatus: {
      type: String,
      enum: ["pending", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// const User = mongoose.model("User", UserSchema);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
