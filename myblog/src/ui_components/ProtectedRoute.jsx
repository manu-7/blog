import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { Navigate, useLocation } from "react-router-dom";
import api from "@/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  useEffect(() => {
    authorize().catch(() => setIsAuthorized(false));
  }, []);

  async function refreshToken() {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
      console.warn("No refresh token found.");
      setIsAuthorized(false);
      return;
    }

    try {
      // Optional: decode and log the refresh token
      const decodedRefresh = jwtDecode(refresh);
      console.log("Refresh token expires at:", new Date(decodedRefresh.exp * 1000));

      const response = await api.post("/token_refresh/", { refresh }, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 200) {
        const newAccess = response.data.access;
        localStorage.setItem("access", newAccess);
        setIsAuthorized(true);
      } else {
        console.warn("Unexpected refresh status:", response.status);
        clearTokens();
        setIsAuthorized(false);
      }
    } catch (err) {
      console.error("Refresh Token Error:", err);
      clearTokens();
      setIsAuthorized(false);
    }
  }

  function clearTokens() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  async function authorize() {
    const token = localStorage.getItem("access");

    if (!token) {
      console.warn("No access token found.");
      setIsAuthorized(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (currentTime > decodedToken.exp) {
        console.log("Access token expired, attempting refresh...");
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (err) {
      console.error("Token Decode Error:", err);
      clearTokens();
      setIsAuthorized(false);
    }
  }

  if (isAuthorized === null) {
    return <Spinner />;
  }

  return isAuthorized ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
