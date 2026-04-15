// ==================== 1. DOTENV (PEHLE) ====================
require("dotenv").config();

// ==================== 2. PACKAGES IMPORT ====================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// ==================== 3. ROUTES IMPORT ====================
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authMiddleware = require("./middleware/authMiddleware");

// ==================== 4. EXPRESS APP ====================
const app = express();

// ==================== 5. MIDDLEWARE ====================
app.use(express.json());

// CORS setup - Allow frontend to connect
// CORS setup - Allow all origins (temporary fix)
// CORS - Allow all
// FORCE CORS - FIX FOR DEPLOYMENT
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://oxyge-technologies.vercel.app",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ==================== 6. IMAGE UPLOAD SETUP ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Make upload available for routes (export karna)
module.exports.upload = upload;

// Serve uploaded images (static folder)
app.use("/uploads", express.static("uploads"));

// ==================== 7. ROUTES ====================
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ==================== 8. MONGODB CONNECTION & SERVER START ====================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error", error);
  });
