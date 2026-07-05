import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : window.location.origin);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// We will inject the token dynamically from AuthContext
let clerkGetToken: (() => Promise<string | null>) | null = null;

export const setClerkTokenGetter = (getter: () => Promise<string | null>) => {
  clerkGetToken = getter;
};

api.interceptors.request.use(async (config) => {
  if (clerkGetToken) {
    const token = await clerkGetToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
