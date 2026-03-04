const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    //link user account 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: [true, "Worker name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },

    skill_type: {
      type: String,
      required: true,
      enum: [
        "plumber",
        "electrician",
        "carpenter",
        "painter",
        "mechanic",
        "cleaner",
        "other",
      ],
    },

    experience_years: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    total_reviews: {
      type: Number,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    location: {
      address: String,
      city: String,
      state: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    profile_image: {
      type: String, // store image URL
    },

    KYC_status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;