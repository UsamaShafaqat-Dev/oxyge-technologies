import React, { useState, useEffect } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/api";

const ManageServices = () => {
  // ------------------- STATES -------------------
  const [services, setServices] = useState([]); // All services
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message

  // Form state (for add/edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "🔧",
    slug: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Get token from localStorage
  const token = localStorage.getItem("adminToken");

  // ------------------- FETCH SERVICES -------------------
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getServices();
      setServices(response.services || []);
      setError(null);
    } catch (err) {
      console.log("Fetch error:", err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  // Load services on page mount
  useEffect(() => {
    fetchServices();
  }, []);

  // ------------------- HANDLE FORM INPUT -------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  // ------------------- OPEN MODAL (ADD) -------------------
  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      icon: "🔧",
      slug: "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  // ------------------- OPEN MODAL (EDIT) -------------------
  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || "🔧",
      slug: service.slug,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  // ------------------- HANDLE SUBMIT (ADD/EDIT) -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      if (editingService) {
        // Update existing service
        await updateService(editingService._id, formData, token);
      } else {
        // Create new service
        await createService(formData, token);
      }

      // Close modal and refresh list
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      console.log("Submit error:", err);
      setFormError(err.response?.data?.message || "Failed to save service");
    } finally {
      setFormLoading(false);
    }
  };

  // ------------------- HANDLE DELETE -------------------
  const handleDelete = async (service) => {
    if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        await deleteService(service._id, token);
        fetchServices(); // Refresh list
      } catch (err) {
        console.log("Delete error:", err);
        alert("Failed to delete service");
      }
    }
  };

  // ------------------- LOADING STATE -------------------
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl" style={{ color: "var(--foreground)" }}>
          Loading services...
        </div>
      </div>
    );
  }

  // ------------------- MAIN RENDER -------------------
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Manage Services
        </h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg transition-all hover:scale-105"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
        >
          + Add New Service
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg text-center bg-red-100 text-red-700">
          {error}
        </div>
      )}

      {/* Services Table */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{ border: "1px solid var(--border)" }}
      >
        <table className="w-full">
          <thead style={{ backgroundColor: "var(--bg-card)" }}>
            <tr>
              <th
                className="p-3 text-left"
                style={{ color: "var(--foreground)" }}
              >
                Icon
              </th>
              <th
                className="p-3 text-left"
                style={{ color: "var(--foreground)" }}
              >
                Title
              </th>
              <th
                className="p-3 text-left"
                style={{ color: "var(--foreground)" }}
              >
                Description
              </th>
              <th
                className="p-3 text-left"
                style={{ color: "var(--foreground)" }}
              >
                Slug
              </th>
              <th
                className="p-3 text-center"
                style={{ color: "var(--foreground)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center"
                  style={{ color: "var(--foreground-light)" }}
                >
                  No services found. Click "Add New Service" to create one.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service._id}
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <td className="p-3 text-2xl">{service.icon || "🔧"}</td>
                  <td className="p-3" style={{ color: "var(--foreground)" }}>
                    {service.title}
                  </td>
                  <td
                    className="p-3"
                    style={{ color: "var(--foreground-light)" }}
                  >
                    {service.description?.substring(0, 50)}...
                  </td>
                  <td
                    className="p-3"
                    style={{ color: "var(--foreground-light)" }}
                  >
                    {service.slug}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => openEditModal(service)}
                      className="px-3 py-1 rounded mr-2 transition-all hover:scale-105"
                      style={{ backgroundColor: "#3B82F6", color: "white" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service)}
                      className="px-3 py-1 rounded transition-all hover:scale-105"
                      style={{ backgroundColor: "#EF4444", color: "white" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>

            {formError && (
              <div className="mb-4 p-2 rounded text-center bg-red-100 text-red-700 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Service Title *"
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
                type="text"
                name="icon"
                placeholder="Icon (emoji) *"
                value={formData.icon}
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
                type="text"
                name="slug"
                placeholder="Slug (auto-generated from title)"
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
                    : editingService
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

export default ManageServices;
