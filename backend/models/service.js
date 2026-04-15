const mongoose = require("mongoose");

// Service ka schema (structure)
const serviceSchema = new mongoose.Schema(
  {
    // Service ka title — jaise "React Development"
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Service ki description — jaise "We build modern UIs"
    description: {
      type: String,
      required: true,
    },

    // Icon ke liye — jaise "FaReact" (font awesome ka naam)
    icon: {
      type: String,
      default: "FaCog", // Agar kuch na do toh yeh default
    },

    // SEO ke liye friendly URL — jaise "react-development"
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true, // createdAt aur updatedAt auto add
  },
);

// Model banana — database mein 'services' collection banegi
module.exports = mongoose.model("Service", serviceSchema);
