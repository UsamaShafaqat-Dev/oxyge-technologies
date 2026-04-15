import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const cards = [
    {
      id: "services",
      title: "Manage Services",
      description: "Add, edit, or delete services",
      icon: "🛠️",
      path: "/admin/services",
      color: "#10B981",
    },
    {
      id: "portfolio",
      title: "Manage Portfolio",
      description: "Add, edit, or delete projects",
      icon: "📁",
      path: "/admin/portfolio",
      color: "#3B82F6",
    },
    {
      id: "messages",
      title: "View Messages",
      description: "Read contact form messages",
      icon: "📧",
      path: "/admin/messages",
      color: "#F59E0B",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span style={{ color: "var(--foreground-light)" }}>
            Welcome, {user.name || "Admin"}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#EF4444", color: "white" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => navigate(card.path)}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="rounded-xl cursor-pointer overflow-hidden"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              transform:
                hoveredCard === card.id
                  ? "translateY(-8px)"
                  : "translateY(0px)",
              boxShadow:
                hoveredCard === card.id
                  ? "0 20px 25px -12px rgba(0, 0, 0, 0.25)"
                  : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
            }}
          >
            <div className="p-6 text-center">
              {/* Icon with smooth animation */}
              <div
                className="text-6xl mb-4 inline-block"
                style={{
                  transform:
                    hoveredCard === card.id
                      ? "scale(1.15) rotate(5deg)"
                      : "scale(1) rotate(0deg)",
                  transition: "transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                  display: "inline-block",
                }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  color:
                    hoveredCard === card.id ? card.color : "var(--foreground)",
                  transition: "color 0.3s ease-out",
                }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="mb-4 text-sm"
                style={{ color: "var(--foreground-light)" }}
              >
                {card.description}
              </p>

              {/* Button */}
              <button
                className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: card.color,
                  color: "white",
                }}
              >
                Go to {card.title.split(" ")[1]} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
