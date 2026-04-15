// Express ka Router lana (routes banane ke liye)
const express = require("express");

// Service controller se saare functions import karna
const {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// Auth middleware lana (taake sirf admin hi service add/edit/delete kar sake)
const authMiddleware = require("../middleware/authMiddleware");

// Router banaya
const router = express.Router();

// ------------------- PUBLIC ROUTES (Bina login ke kaam karein) -------------------
// Yeh routes koi bhi use kar sakta hai — website par services dikhne ke liye

// GET: Saari services le ana (home page ke liye)
router.get("/", getAllServices);

// GET: Ek specific service le ana (detail page ke liye)
router.get("/:id", getSingleService);

// ------------------- PROTECTED ROUTES (Sirf admin login karne ke baad) -------------------
// Yeh routes sirf wahi use kar sakta hai jiske paas valid JWT token ho

// POST: Nayi service add karna (admin panel se)
router.post("/", authMiddleware, createService);

// PUT: Service edit karna (admin panel se)
router.put("/:id", authMiddleware, updateService);

// DELETE: Service delete karna (admin panel se)
router.delete("/:id", authMiddleware, deleteService);

// Router ko export karna (server.js mein use karne ke liye)
module.exports = router;
