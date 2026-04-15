import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // Token nahi hai → login page par bhejo
    return <Navigate to="/admin/login" replace />;
  }

  // Token hai → page dikhao
  return children;
};

export default ProtectedRoute;
