import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // 1. Added imports

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate(); // For programmatic redirect on logout

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const token = localStorage.getItem("adminToken");
    setIsAdminLoggedIn(!!token);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAdminLoggedIn(false);
    navigate("/"); // 2. Use navigate instead of window.location
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  const lightMode = {
    navBg: "#1A3A2A",
    text: "#FFFFFF",
    textMuted: "#D1D5DB",
    buttonBg: "#2D4A3A",
  };

  const darkModeColors = {
    navBg: "#1E1B4B",
    text: "#E5E7EB",
    textMuted: "#9CA3AF",
    buttonBg: "#2D2A5A",
  };

  const colors = darkMode ? darkModeColors : lightMode;

  // 3. Helper for active link styles
  const getLinkStyle = ({ isActive }) => ({
    color: isActive ? "#10B981" : colors.textMuted,
  });

  return (
    <>
      <nav
        style={{
          backgroundColor: colors.navBg,
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: darkMode
            ? "0 1px 2px 0 rgba(0, 0, 0, 0.3)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <NavLink
              to="/"
              style={{ color: colors.text }}
              className="hover:text-[#10B981] transition-colors duration-300"
            >
              OXEGE
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={getLinkStyle}
                className="relative font-medium pb-1 group transition-colors duration-300 hover:text-[#10B981]"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}

            {isAdminLoggedIn && (
              <NavLink
                to="/admin/dashboard"
                style={getLinkStyle}
                className="relative font-medium pb-1 group transition-colors duration-300 hover:text-[#10B981]"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            )}

            {isAdminLoggedIn ? (
              <button
                onClick={handleLogout}
                style={{ color: colors.textMuted }}
                className="relative font-medium pb-1 group transition-colors duration-300 hover:text-[#EF4444]"
              >
                Logout
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF4444] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : (
              <NavLink
                to="/admin/login"
                style={getLinkStyle}
                className="relative font-medium pb-1 group transition-colors duration-300 hover:text-[#10B981]"
              >
                Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            )}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              style={{
                padding: "8px",
                borderRadius: "9999px",
                fontSize: "1.25rem",
                backgroundColor: colors.buttonBg,
                transition: "all 0.3s ease",
              }}
              className="hover:scale-110 transition-transform"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-300"
              style={{ backgroundColor: colors.buttonBg, borderRadius: "8px" }}
            >
              <svg
                className="w-6 h-6 transition-transform duration-300"
                style={{
                  color: colors.text,
                  transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          style={{
            display: isMenuOpen ? "block" : "none",
            animation: isMenuOpen ? "slideDown 0.4s ease-out" : "none",
          }}
        >
          <div
            style={{
              backgroundColor: colors.navBg,
              borderTop: darkMode ? "1px solid #334155" : "1px solid #2D4A3A",
            }}
            className="py-4"
          >
            <div className="flex flex-col space-y-3 px-4">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  style={getLinkStyle}
                  className="hover:text-[#10B981] transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

              {isAdminLoggedIn && (
                <NavLink
                  to="/admin/dashboard"
                  style={getLinkStyle}
                  className="hover:text-[#10B981] transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}

              {isAdminLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  style={{ color: colors.textMuted }}
                  className="hover:text-[#EF4444] transition-colors py-2 font-medium text-left"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/admin/login"
                  style={getLinkStyle}
                  className="hover:text-[#10B981] transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
