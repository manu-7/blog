import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Flag to avoid multiple refresh attempts simultaneously
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Add request interceptor
api.interceptors.request.use(
  async config => {
    const access = localStorage.getItem("access");

    if (access) {
      const decoded = jwtDecode(access);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const refresh = localStorage.getItem("refresh");
            const response = await axios.post(`${BASE_URL}/token_refresh/`, { refresh });
            const newAccess = response.data.access;
            localStorage.setItem("access", newAccess);
            config.headers.Authorization = `Bearer ${newAccess}`;
            processQueue(null, newAccess);
          } catch (err) {
            processQueue(err, null);
            throw err;
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              config.headers.Authorization = `Bearer ${token}`;
              resolve(config);
            },
            reject: err => {
              reject(err);
            },
          });
        });
      } else {
        config.headers.Authorization = `Bearer ${access}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor to catch 401 globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request – possibly invalid or expired token.");
    }
    return Promise.reject(error);
  }
);

export default api;
