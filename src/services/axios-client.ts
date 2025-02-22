import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:12345/api/v1";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

export default axiosClient;
