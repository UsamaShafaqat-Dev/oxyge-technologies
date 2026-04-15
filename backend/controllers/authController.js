const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ------------------- REGISTER FUNCTION -------------------

const register = async (req, res) => {
  try {
    // 1. Request se data lena (name, email, password)
    const { name, email, password } = req.body;

    // 2. Check karna ke user already exist to nahi karta
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }
    // 3. Password ko hash (encrypt) karna
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Naya user create karna
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin", // Pehla admin banane ke liye
    });

    // 5. Success response bhejna (password nahi bhejna)
    res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({
      message: "Server error, please try again later",
    });
  }
};

const jwt = require("jsonwebtoken");

// ------------------- LOGIN FUNCTION -------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check karo ke user exist karta hai ya nahi
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 2. Password match karo
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. JWT Token generate karo
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // 7 din baad token expire ho jayega
    );

    // 4. Response bhejo
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({
      message: "Server error, please try again later",
    });
  }
};

module.exports = { register, login };
