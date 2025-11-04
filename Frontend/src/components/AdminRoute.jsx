import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const AdminRoute = () => {
    const { user } = useAuth();
    const location = useLocation();
    if (!user) {
 
        return <Navigate to="/sign-in" state={{ from: location, message: "Debes iniciar sesión para acceder al panel." }} replace />;
    }

    const isAdmin = user.role_name === "admin" || user.id_role === "2";

    if (!isAdmin) {
        return <Navigate to="/home" state={{ from: location, message: "Acceso denegado. No tienes permisos de administrador." }} replace />;
    }

    return <Outlet />;
};

export default AdminRoute;