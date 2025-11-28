import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. Esperamos a que el contexto termine de verificar la sesión
  if (loading) {
    return <div>Cargando...</div>;
  }

  // 2. Si, después de cargar, SÍ hay un usuario, lo redirigimos
  if (user) {
    // Lógica de redirección: si es admin, al panel; si no, a home.
    const redirectTo = user.role_name === 'admin' ? '/panel-admin' : '/';
    return <Navigate to={redirectTo} replace />;
  }

  // 3. Si no hay usuario, permitimos que vea el contenido (el formulario de login/signup)
  return children;
};

export default PublicRoute;