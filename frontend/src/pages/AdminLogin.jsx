import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when typing
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(formData.email, formData.password);

      // Token store karo localStorage mein
      localStorage.setItem("adminToken", response.token);
      localStorage.setItem("adminUser", JSON.stringify(response.user));

      // Dashboard par redirect karo
      navigate("/admin/dashboard");
    } catch (err) {
      console.log("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="max-w-md w-full p-8 rounded-xl"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Heading */}
        <h2
          className="text-3xl font-bold text-center mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Admin Login
        </h2>
        <p
          className="text-center mb-8"
          style={{ color: "var(--foreground-light)" }}
        >
          Enter your credentials to access dashboard
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg text-center bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#10B981]"
            style={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#10B981]"
            style={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
