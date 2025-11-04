import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const AdminRoute = () => {
  const { user, loading } = useAuth(); // se le pasa también el loading
  const location = useLocation();
  // si estamos en el estado de carga inicial, no se muestra nada.
  // 1. Esperar mientras se verifica la sesión
  if (loading) {
    return <div>Cargando...</div>;
  }

  // 2. Si no hay usuario, redirigir a login con mensaje
  if (!user) {
    return (
      <Navigate
        to="/sign-in"
        state={{
          from: location,
          message: 'Debes iniciar sesión para acceder al panel.',
        }}
        replace
      />
    );
  }

  // 3. Si el usuario no es admin, redirigir a home con mensaje
  if (user.role_name !== 'admin') {
    return (
      <Navigate
        to="/home"
        state={{
          from: location,
          message: 'Acceso denegado. No tienes permisos de administrador.',
        }}
        replace
      />
    );
  }

  // if (!user) {

  //     return <Navigate to="/sign-in" state={{ from: location, message: "Debes iniciar sesión para acceder al panel." }} replace />;
  // }

  // const  isAdmin = user.role_name === "admin" || user.id_role === "2";

  // if (!isAdmin) {
  //     return <Navigate to="/home" state={{ from: location, message: "Acceso denegado. No tienes permisos de administrador." }} replace />;
  // }
  
  //4. Si todo está bien, mostrar el contenido de la ruta de admin
  return <Outlet />;
};

export default AdminRoute;