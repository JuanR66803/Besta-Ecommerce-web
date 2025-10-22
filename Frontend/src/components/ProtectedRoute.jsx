import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user)
    {
        return <Navigate to="/sign-in" state={{ from: location, message: "Debes iniciar sesión para acceder a esta página." }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;