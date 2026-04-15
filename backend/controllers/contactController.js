// Contact model ko laana
const Contact = require("../models/Contact");

// ------------------- 1. CREATE MESSAGE (User form bharega) -------------------
// Yeh PUBLIC route hai — bina login ke kaam karega
const createMessage = async (req, res) => {
  try {
    // Request se data lena (user ne jo bhara)
    const { name, email, phone, subject, message } = req.body;

    // Naya message create karna database mein
    const newMessage = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      isRead: false, // Naya message hai, abhi read nahi hua
    });

    // Success response bhejna
    res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully. We will contact you soon.",
      data: newMessage,
    });
  } catch (error) {
    console.log("Create message error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// ------------------- 2. GET ALL MESSAGES (Admin saare messages dekhega) -------------------
// Yeh PROTECTED route hai — sirf admin login karega
const getAllMessages = async (req, res) => {
  try {
    // Database se saare messages le ana (latest pehle aaye)
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount: messages.filter((m) => !m.isRead).length, // kitne unread hain
      messages: messages,
    });
  } catch (error) {
    console.log("Get all messages error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------- 3. GET SINGLE MESSAGE (Admin ek specific message dekhega) -------------------
const getSingleMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: message,
    });
  } catch (error) {
    console.log("Get single message error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------- 4. MARK AS READ (Admin ne message padh liya) -------------------
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedMessage,
    });
  } catch (error) {
    console.log("Mark as read error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------- 5. DELETE MESSAGE (Admin message delete karega) -------------------
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.log("Delete message error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getSingleMessage,
  markAsRead,
  deleteMessage,
};
