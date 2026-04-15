import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getServices } from "../services/api";

const Services = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices();
        setServices(response.services || []);
        setError(null);
      } catch (err) {
        console.log("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl" style={{ color: "var(--foreground)" }}>
          Loading services...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1
        className="text-4xl font-bold text-center mb-4"
        style={{ color: "var(--foreground)" }}
      >
        Our Services
      </h1>
      <p
        className="text-center mb-12 max-w-2xl mx-auto"
        style={{ color: "var(--foreground-light)" }}
      >
        We provide high-quality digital solutions to grow your business
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            onClick={() => navigate(`/services/${service._id}`)}
            onMouseEnter={() => setHoveredId(service._id)}
            onMouseLeave={() => setHoveredId(null)}
            className="p-6 rounded-xl text-center cursor-pointer"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              transform:
                hoveredId === service._id
                  ? "translateY(-8px)"
                  : "translateY(0px)",
              boxShadow:
                hoveredId === service._id
                  ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                  : "none",
              transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
            }}
          >
            <div
              className="text-6xl mb-4"
              style={{
                transform:
                  hoveredId === service._id
                    ? "scale(1.1) rotate(3deg)"
                    : "scale(1) rotate(0deg)",
                transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
              }}
            >
              {service.icon || "🔧"}
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{
                color:
                  hoveredId === service._id ? "#10B981" : "var(--foreground)",
                transition: "color 0.3s ease",
              }}
            >
              {service.title}
            </h3>
            <p style={{ color: "var(--foreground-light)" }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
