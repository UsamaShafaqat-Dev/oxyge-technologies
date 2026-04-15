const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// POST request par /register route par register function call hoga
router.post("/register", register);
router.post("/login", login);

module.exports = router;
