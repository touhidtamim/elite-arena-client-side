import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Request interceptor to add JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
