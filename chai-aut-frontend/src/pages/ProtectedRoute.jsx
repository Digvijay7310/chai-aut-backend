import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/users/me");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
