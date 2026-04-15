// Express ka Router lana (routes banane ke liye)
const express = require("express");

// Multer import karna (image upload ke liye)
const multer = require("multer");
const path = require("path");

// Portfolio controller se saare functions import karna
const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
} = require("../controllers/portfolioController");

// Auth middleware lana (taake sirf admin hi project add/edit/delete kar sake)
const authMiddleware = require("../middleware/authMiddleware");

// ==================== IMAGE UPLOAD SETUP ====================
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

// Router banaya
const router = express.Router();

// ------------------- PUBLIC ROUTES (Bina login ke kaam karein) -------------------
// GET: Saare projects le ana (portfolio page ke liye)
router.get("/", getAllProjects);

// GET: Ek specific project le ana (detail page ke liye)
router.get("/:id", getSingleProject);

// ------------------- PROTECTED ROUTES (Sirf admin login karne ke baad) -------------------
// POST: Naya project add karna (admin panel se) - WITH IMAGE UPLOAD
router.post("/", authMiddleware, upload.single("image"), createProject);

// PUT: Project edit karna (admin panel se) - WITH IMAGE UPLOAD
router.put("/:id", authMiddleware, upload.single("image"), updateProject);

// DELETE: Project delete karna (admin panel se)
router.delete("/:id", authMiddleware, deleteProject);

// Router ko export karna (server.js mein use karne ke liye)
module.exports = router;
