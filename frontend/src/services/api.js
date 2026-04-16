// Axios import karna
import axios from "axios";

// Backend ka base URL (jo humne pehle banaya tha)
// Backend port 5000 par chal raha hai

const API_URL = "https://oxyge-technologies.onrender.com/api";

// Axios instance create kiya (taake baar baar base URL na likhna pade)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------- SERVICES APIs -------------------

// Saari services lene ke liye (public)
export const getServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

// Ek service lene ke liye (public)
export const getServiceById = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

// Nayi service add karne ke liye (admin — token chahiye)
export const createService = async (serviceData, token) => {
  const response = await api.post("/services", serviceData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Service update karne ke liye (admin)
export const updateService = async (id, serviceData, token) => {
  const response = await api.put(`/services/${id}`, serviceData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Service delete karne ke liye (admin)
export const deleteService = async (id, token) => {
  const response = await api.delete(`/services/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ------------------- PORTFOLIO APIs -------------------

// Saare projects lene ke liye (public)
export const getProjects = async () => {
  const response = await api.get("/portfolio");
  return response.data;
};

// Ek project lene ke liye (public)
export const getProjectById = async (id) => {
  const response = await api.get(`/portfolio/${id}`);
  return response.data;
};

// Naya project add karne ke liye (admin)
export const createProject = async (projectData, token) => {
  const response = await api.post("/portfolio", projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Project update karne ke liye (admin)
export const updateProject = async (id, projectData, token) => {
  const response = await api.put(`/portfolio/${id}`, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Project delete karne ke liye (admin)
export const deleteProject = async (id, token) => {
  const response = await api.delete(`/portfolio/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ------------------- CONTACT APIs -------------------

// Contact form submit (public)
export const sendContactMessage = async (formData) => {
  const response = await api.post("/contact", formData);
  return response.data;
};

// Saare messages lene ke liye (admin)
export const getMessages = async (token) => {
  const response = await api.get("/contact", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Message ko read mark karne ke liye (admin)
export const markMessageAsRead = async (id, token) => {
  const response = await api.put(
    `/contact/${id}/read`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};

// Message delete karne ke liye (admin)
export const deleteMessage = async (id, token) => {
  const response = await api.delete(`/contact/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ------------------- AUTH APIs -------------------

// Login
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Register
export const register = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

export default api;
