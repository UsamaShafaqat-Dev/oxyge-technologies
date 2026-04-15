import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../services/api";

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if admin is logged in
  const token = localStorage.getItem("adminToken");
  const isAdmin = !!token;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await getProjectById(id);
        setProject(response.project);
        setError(null);
      } catch (err) {
        setError("Project not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
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

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl text-red-500">
          {error || "Project not found"}
        </div>
        <button
          onClick={() => navigate("/portfolio")}
          className="mt-4 px-4 py-2 rounded"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button + Edit Button (if admin) */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/portfolio")}
          className="flex items-center gap-2 transition-all hover:scale-105"
          style={{ color: "var(--accent)" }}
        >
          ← Back to Portfolio
        </button>

        {/* EDIT BUTTON - SIRF ADMIN KE LIYE */}
        {isAdmin && (
          <button
            onClick={() => navigate(`/admin/portfolio`)}
            className="px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: "#3B82F6", color: "white" }}
          >
            ✏️ Edit Project
          </button>
        )}
      </div>

      {/* Project Detail */}
      <div className="max-w-4xl mx-auto">
        {project.image ? (
          <img
            src={`http://localhost:5000${project.image}`}
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
          />
        ) : (
          <div className="text-8xl text-center mb-6">📁</div>
        )}

        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          {project.title}
        </h1>
        <p className="text-lg mb-4" style={{ color: "var(--accent)" }}>
          {project.category}
        </p>

        <div
          className="p-6 rounded-xl mb-6"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Description
          </h2>
          <p style={{ color: "var(--foreground-light)" }}>
            {project.description}
          </p>
        </div>

        {project.technologies && (
          <div
            className="p-6 rounded-xl mb-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: "var(--foreground)" }}
            >
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.split(",").map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground-light)",
                  }}
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: "var(--accent)", color: "white" }}
            >
              Live Demo →
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: "#24292e", color: "white" }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
