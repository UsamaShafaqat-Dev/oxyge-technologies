import React, { useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/api";

const ManagePortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Web App",
    description: "",
    technologies: "",
    liveLink: "",
    githubLink: "",
    slug: "",
  });

  const token = localStorage.getItem("adminToken");
  const categories = [
    "Web App",
    "Mobile App",
    "E-commerce",
    "CMS",
    "AI Solution",
    "Design",
    "Other",
  ];

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      setProjects(response.projects || []);
      setError(null);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Web App",
      description: "",
      technologies: "",
      liveLink: "",
      githubLink: "",
      slug: "",
    });
    setSelectedImage(null);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category || "Web App",
      description: project.description || "",
      technologies: project.technologies || "",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      slug: project.slug,
    });
    setSelectedImage(null);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("technologies", formData.technologies);
      formDataToSend.append("liveLink", formData.liveLink);
      formDataToSend.append("githubLink", formData.githubLink);
      formDataToSend.append("slug", formData.slug);

      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      let response;
      if (editingProject) {
        response = await fetch(
          `http://localhost:5000/api/portfolio/${editingProject._id}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formDataToSend,
          },
        );
      } else {
        response = await fetch("http://localhost:5000/api/portfolio", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataToSend,
        });
      }

      if (response.ok) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        const data = await response.json();
        setFormError(data.message || "Failed to save project");
      }
    } catch (err) {
      setFormError("Failed to save project");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      try {
        await deleteProject(project._id, token);
        fetchProjects();
      } catch (err) {
        alert("Failed to delete project");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl" style={{ color: "var(--foreground)" }}>
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Manage Portfolio
        </h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg transition-all hover:scale-105"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
        >
          + Add New Project
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg text-center bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div
            className="col-span-full text-center py-12"
            style={{ color: "var(--foreground-light)" }}
          >
            No projects found. Click "Add New Project" to create one.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="p-6 rounded-xl transition-all duration-300 hover:shadow-xl"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              {project.image ? (
                <img
                  src={`http://localhost:5000${project.image}`}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="text-6xl mb-4 text-center">📁</div>
              )}
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "var(--foreground)" }}
              >
                {project.title}
              </h3>
              <p className="text-sm mb-2" style={{ color: "var(--accent)" }}>
                {project.category}
              </p>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--foreground-light)" }}
              >
                {project.description?.substring(0, 80)}...
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(project)}
                  className="flex-1 px-3 py-1 rounded transition-all hover:scale-105"
                  style={{ backgroundColor: "#3B82F6", color: "white" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project)}
                  className="flex-1 px-3 py-1 rounded transition-all hover:scale-105"
                  style={{ backgroundColor: "#EF4444", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8">
          <div
            className="w-full max-w-md p-6 rounded-xl mx-4"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            {formError && (
              <div className="mb-4 p-2 rounded text-center bg-red-100 text-red-700 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Project Title *"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 rounded outline-none focus:ring-2 focus:ring-[#10B981]"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 rounded outline-none focus:ring-2 focus:ring-[#10B981]"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                placeholder="Description *"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 rounded outline-none focus:ring-2 focus:ring-[#10B981]"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />

              <input
                type="text"
                name="technologies"
                placeholder="Technologies (comma separated)"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full p-2 rounded outline-none focus:ring-2 focus:ring-[#10B981]"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />

              <input
                type="url"
                name="liveLink"
                placeholder="Live Demo Link"
                value={formData.liveLink}
                onChange={handleChange}
                className="w-full p-2 rounded outline-none focus:ring-2 focus:ring-[#10B981]"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />

              <input
                type="url"
                name="githubLink"
                placeholder="GitHub Link"
                value={formData.githubLink}
                onChange={handleChange}
                className="w-full p-2 rounded outline-none focus:ring-2 focus:ring-[#10B981]"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />

              <input
                type="text"
                name="slug"
                placeholder="Slug (auto-generated)"
                value={formData.slug}
                readOnly
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
                style={{ color: "var(--foreground-light)" }}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 rounded transition-all"
                  style={{ backgroundColor: "#6B7280", color: "white" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-2 rounded transition-all hover:scale-105 disabled:opacity-50"
                  style={{ backgroundColor: "var(--accent)", color: "white" }}
                >
                  {formLoading
                    ? "Saving..."
                    : editingProject
                      ? "Update"
                      : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePortfolio;
