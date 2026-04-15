const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Token get karo headers se
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User info req mein attach karo
    req.user = decoded;

    // Agle function par jao
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = authMiddleware;
