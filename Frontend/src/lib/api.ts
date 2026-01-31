import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : window.location.origin);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (e.g. 401 Unauthorized)
    if (error.response?.status === 401) {
      // Optional: Check if we are already on the login page to avoid loops
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
