import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";


const AdminRoute = () => {
  const { user, loading } = useAuth(); // se le pasa también el loading
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkServerAdmin = async () => {
      // Si no hay usuario ni token, no verificar
      const token = localStorage.getItem('token');
      if (!token) {
        if (mounted) {
          setAllowed(false);
          setVerifying(false);
        }
        return;
      }

      try {
        const baseURL = import.meta.env.VITE_API_URL || '';
        const url = baseURL ? `${baseURL}/api/auth/verify-admin` : '/api/auth/verify-admin';
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!mounted) return;

        if (res.ok) {
          const data = await res.json();
          if (data.allowed) {
            setAllowed(true);
          } else {
            setAllowed(false);
          }
        } else {
          setAllowed(false);
        }
      } catch (err) {
        console.error('Error verificando admin en servidor:', err);
        setAllowed(false);
      } finally {
        if (mounted) setVerifying(false);
      }
    };

    // Solo intentar verificación si hay usuario cargado
    if (!loading) checkServerAdmin();

    return () => {
      mounted = false;
    };
  }, [loading]);

  // Mostrar cargando mientras el contexto inicial se resuelve o la verificación está en curso
  if (loading || verifying) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario autenticado en el cliente, redirigir a login
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

  // Si la verificación server-side no permitió el acceso, redirigir a home
  if (!allowed) {
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

  // Permitir acceso
  return <Outlet />;
};

export default AdminRoute;