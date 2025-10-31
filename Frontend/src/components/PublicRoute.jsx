import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Si está logueado, redirige al home o panel según rol
  if (user) {
    if (user.role_name === "admin" || user.id_role === "2") {
      return <Navigate to="/panel-admin" state={{ from: location }} replace />;
    }
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  // Si no está logueado, renderiza la ruta pública
  return children;
};

export default PublicRoute;
