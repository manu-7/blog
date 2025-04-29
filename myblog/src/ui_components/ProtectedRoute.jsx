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
      setIsAuthorized(false);
      return;
    }

    try {
      const response = await api.post("token_refresh/", { refresh });

      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        setIsAuthorized(true); // Successfully refreshed
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      setIsAuthorized(false);
      console.error("Refresh Token Error:", err);
    }
  }

  async function authorize() {
    const token = localStorage.getItem("access");

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const expiryDate = decodedToken.exp;
      const currentTime = Date.now() / 1000;

      if (currentTime > expiryDate) {
        // Token expired, attempt refresh
        await refreshToken();
      } else {
        setIsAuthorized(true); // Token still valid
      }
    } catch (err) {
      console.error("Token Decode Error:", err);
      setIsAuthorized(false);
    }
  }

  if (isAuthorized === null) {
    return <Spinner />;
  }

  return (
    <>
      {isAuthorized ? (
        children
      ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
