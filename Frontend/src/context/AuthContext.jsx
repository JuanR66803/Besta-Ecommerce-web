import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { toast } from 'react-toastify'; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para saber si se esta verificando la autenticación inicial
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        

        try {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Error al parsear usuario desde localStorage:", error);
            localStorage.removeItem("user"); // Limpia el dato corrupto
        } finally {
            setLoading(false); // al finalizar la verificación, se marca que ya no estamos cargando.
        }


    }, []);
    const login = (userData,token) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token); // <--- guarda el token
        toast.success(`¡Bienvenido de nuevo, ${userData.full_name}!`);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.info('Has cerrado sesión. ¡Vuelve pronto!');
        navigate("/sign-in");
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};