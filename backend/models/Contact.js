const mongoose = require("mongoose");

// Contact message ka schema (structure)
const contactSchema = new mongoose.Schema(
  {
    // User ka naam
    name: {
      type: String,
      required: true, // Yeh dena zaroori hai
      trim: true,
    },

    // User ki email
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // User ka phone number (optional)
    phone: {
      type: String,
      default: "",
    },

    // Message ka subject
    subject: {
      type: String,
      required: true,
    },

    // User ka message
    message: {
      type: String,
      required: true,
    },

    // Kya admin ne yeh message padh liya?
    isRead: {
      type: Boolean,
      default: false, // Naya message aaya toh "unread" hoga
    },
  },
  {
    timestamps: true, // createdAt (kab message aaya) aur updatedAt
  },
);

// Model banana — database mein 'contacts' collection banegi
module.exports = mongoose.model("Contact", contactSchema);
