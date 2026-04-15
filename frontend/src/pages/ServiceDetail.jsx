import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "../services/api";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const isAdmin = !!token;

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await getServiceById(id);
        setService(response.service);
        setError(null);
      } catch (err) {
        setError("Service not found");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl" style={{ color: "var(--foreground)" }}>
          Loading...
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl text-red-500">
          {error || "Service not found"}
        </div>
        <button
          onClick={() => navigate("/services")}
          className="mt-4 px-4 py-2 rounded"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 transition-all hover:scale-105"
          style={{ color: "var(--accent)" }}
        >
          ← Back to Services
        </button>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin/services")}
            className="px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: "#3B82F6", color: "white" }}
          >
            ✏️ Manage Services
          </button>
        )}
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <div className="text-8xl mb-6">{service.icon || "🔧"}</div>
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          {service.title}
        </h1>
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <p style={{ color: "var(--foreground-light)" }}>
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
