const express = require("express");
const {
  createMessage,
  getAllMessages,
  getSingleMessage,
  markAsRead,
  deleteMessage,
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ------------------- PUBLIC ROUTE (Bina login ke) -------------------
// POST: User contact form bharega
router.post("/", createMessage);

// ------------------- PROTECTED ROUTES (Sirf admin login karne ke baad) -------------------
// GET: Saare messages dekhna (admin panel)
router.get("/", authMiddleware, getAllMessages);

// GET: Ek specific message dekhna
router.get("/:id", authMiddleware, getSingleMessage);

// PUT: Message ko "read" mark karna
router.put("/:id/read", authMiddleware, markAsRead);

// DELETE: Message delete karna
router.delete("/:id", authMiddleware, deleteMessage);

module.exports = router;
