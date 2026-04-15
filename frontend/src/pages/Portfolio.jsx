import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← ADD KAREN (1)
import { getProjects } from "../services/api";

const Portfolio = () => {
  const navigate = useNavigate(); // ← ADD KAREN (2)
  const [hoveredId, setHoveredId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        setProjects(response.projects || []);
        setError(null);
      } catch (err) {
        console.log("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl" style={{ color: "var(--foreground)" }}>
          Loading projects...
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
        Our Portfolio
      </h1>
      <p
        className="text-center mb-12 max-w-2xl mx-auto"
        style={{ color: "var(--foreground-light)" }}
      >
        Check out some of our recent projects
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/portfolio/${project._id}`)} // ← ADD KAREN (3)
            onMouseEnter={() => setHoveredId(project._id)}
            onMouseLeave={() => setHoveredId(null)}
            className="p-6 rounded-xl text-center cursor-pointer"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              transform:
                hoveredId === project._id
                  ? "translateY(-8px)"
                  : "translateY(0px)",
              boxShadow:
                hoveredId === project._id
                  ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                  : "none",
              transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
            }}
          >
            {/* Image or Emoji */}
            {project.image ? (
              <img
                src={`http://localhost:5000${project.image}`}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                style={{
                  transform:
                    hoveredId === project._id ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                }}
              />
            ) : (
              <div
                className="text-7xl mb-4 text-center"
                style={{
                  transform:
                    hoveredId === project._id
                      ? "scale(1.1) rotate(3deg)"
                      : "scale(1) rotate(0deg)",
                  transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                }}
              >
                📁
              </div>
            )}

            <h3
              className="text-xl font-bold mb-2"
              style={{
                color:
                  hoveredId === project._id ? "#10B981" : "var(--foreground)",
                transition: "color 0.3s ease",
              }}
            >
              {project.title}
            </h3>
            <p className="text-sm mb-2" style={{ color: "var(--accent)" }}>
              {project.category}
            </p>
            <p style={{ color: "var(--foreground-light)" }}>
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
