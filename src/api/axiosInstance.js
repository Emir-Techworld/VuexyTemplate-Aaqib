import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add token automatically if available
apiInstance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const token = userData ? userData.token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiInstance;
