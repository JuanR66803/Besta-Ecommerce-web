import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Cargando...</div>; 
    }
    if (!user) {
      return (
        <Navigate
          to="/sign-in"
          state={{
            from: location,
            message: 'Debes iniciar sesión para acceder a esta página.',
          }}
          replace
        />
      );
    }

    // if (!user)
    // {
    //     return <Navigate to="/sign-in" state={{ from: location, message: "Debes iniciar sesión para acceder a esta página." }} replace />;
    // }

    return children;
};

export default ProtectedRoute;