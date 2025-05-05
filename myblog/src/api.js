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

api.interceptors.request.use(
  async config => {
    const access = localStorage.getItem("access");

    if (access) {
      const decoded = jwtDecode(access);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        if (!isRefreshing) {
          isRefreshing = true;
          const refresh = localStorage.getItem("refresh");

          if (!refresh) {
            processQueue(new Error("No refresh token available"), null);
            throw new Error("No refresh token available");
          }

          try {
            // ✅ Bypass interceptor by using raw axios (not `api`)
            const response = await axios.post(`${BASE_URL}/token_refresh/`, { refresh });

            const newAccess = response.data.access;
            localStorage.setItem("access", newAccess);
            processQueue(null, newAccess);

            // Apply token to original request
            config.headers.Authorization = `Bearer ${newAccess}`;
          } catch (err) {
            processQueue(err, null);
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
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
  error => Promise.reject(error)
);

// Optional: catch all 401s
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
