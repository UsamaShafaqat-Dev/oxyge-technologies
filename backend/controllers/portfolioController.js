const Portfolio = require("../models/Portfolio");

// Create Project with Image
const createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      technologies,
      liveLink,
      githubLink,
      slug,
    } = req.body;

    // Get image path if uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newProject = await Portfolio.create({
      title,
      category,
      description,
      image,
      technologies,
      liveLink,
      githubLink,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.log("Create project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      projects: projects,
    });
  } catch (error) {
    console.log("Get all projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get single project
const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Portfolio.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      project: project,
    });
  } catch (error) {
    console.log("Get single project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update Project with Image
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      description,
      technologies,
      liveLink,
      githubLink,
      slug,
    } = req.body;

    const updateData = {
      title,
      category,
      description,
      technologies,
      liveLink,
      githubLink,
      slug,
    };

    // If new image uploaded, update it
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Portfolio.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log("Update project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Portfolio.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log("Delete project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
