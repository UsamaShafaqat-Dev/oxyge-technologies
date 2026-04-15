// Service model ko laana (database se baat karne ke liye)
const Service = require("../models/service");

// ------------------- 1. CREATE SERVICE (Admin nayi service add karega) -------------------
const createService = async (req, res) => {
  try {
    // Request se data lena (jo admin ne bheja)
    const { title, description, icon, slug } = req.body;

    // Naya service create karna database mein
    const newService = await Service.create({
      title,
      description,
      icon,
      slug,
    });

    // Success response bhejna
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service: newService,
    });
  } catch (error) {
    console.log("Create service error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ------------------- 2. GET ALL SERVICES (Website par sab services dikhane ke liye) -------------------
const getAllServices = async (req, res) => {
  try {
    // Database se saari services le ana
    const services = await Service.find();

    // Response mein bhej dena
    res.status(200).json({
      success: true,
      count: services.length, // kitni services mili
      services: services,
    });
  } catch (error) {
    console.log("Get all services error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------- 3. GET SINGLE SERVICE (Ek specific service dikhane ke liye) -------------------
const getSingleService = async (req, res) => {
  try {
    // URL se id lena (jaise /api/services/123)
    const { id } = req.params;

    // Database mein id se service dhondna
    const service = await Service.findById(id);

    // Agar service na mile
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Service mil gayi toh bhej do
    res.status(200).json({
      success: true,
      service: service,
    });
  } catch (error) {
    console.log("Get single service error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------- 4. UPDATE SERVICE (Admin edit karega) -------------------
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, slug } = req.body;

    // Service dhondna aur update karna
    const updatedService = await Service.findByIdAndUpdate(
      id, // kis service ko update karna hai
      { title, description, icon, slug }, // kya naya dalna hai
      { new: true }, // updated wali service wapas bhejo
    );

    // Agar service na mile
    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.log("Update service error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------- 5. DELETE SERVICE (Admin delete karega) -------------------
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Service dhondna aur delete karna
    const deletedService = await Service.findByIdAndDelete(id);

    // Agar service na mile
    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.log("Delete service error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ------------------- SAB KO EXPORT KARNA (baaki files use kar sakein) -------------------
module.exports = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
