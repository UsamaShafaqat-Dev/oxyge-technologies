const mongoose = require("mongoose");

// Portfolio ka schema (structure)
const portfolioSchema = new mongoose.Schema(
  {
    // Project ka title — jaise "E-commerce Website"
    title: {
      type: String,
      required: true, // Yeh dena zaroori hai
      trim: true, // Extra spaces hata denge
    },

    // Project ki category — jaise "Web App", "Mobile App", "E-commerce"
    category: {
      type: String,
      required: true,
      enum: [
        "Web App",
        "Mobile App",
        "E-commerce",
        "CMS",
        "AI Solution",
        "Other",
      ],
      // Sirf inhi options mein se koi ek select karna hai
    },

    // Project ki short description
    description: {
      type: String,
      required: true,
    },

    // Project ki image ka URL (baad mein image upload karenge)
    image: {
      type: String,
      default: "", // Agar image nahi di toh khali rahega
    },

    // Technologies used — jaise "React, Node.js, MongoDB"
    technologies: {
      type: String,
      default: "",
    },

    // Live project ka link (deployed website)
    liveLink: {
      type: String,
      default: "",
    },

    // GitHub link (agar open source hai toh)
    githubLink: {
      type: String,
      default: "",
    },

    // SEO friendly URL — jaise "ecommerce-website"
    slug: {
      type: String,
      required: true,
      unique: true, // Do projects ka slug same nahi ho sakta
      lowercase: true,
    },
  },
  {
    timestamps: true, // createdAt aur updatedAt auto add
  },
);

// Model banana — database mein 'portfolios' collection banegi
module.exports = mongoose.model("Portfolio", portfolioSchema);
