import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";

const AUTH_TOKEN_KEY = "ebola_admin_token";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  // Check if user is authenticated
  if (!token) {
    // Redirect to login page, saving the attempted URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check token expiration (24 hours)
  try {
    const tokenData = atob(token);
    const [, timestamp] = tokenData.split(":");
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (tokenAge > maxAge) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  } catch (error) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
