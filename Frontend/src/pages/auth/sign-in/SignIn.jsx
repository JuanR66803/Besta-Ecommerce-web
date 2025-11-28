import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import React from "react";
import "./SignIn.css"

const SignIn = () => {
    const API_URL_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    const API_URL = `${API_URL_BASE}/api/auth/login`;
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();


    // Mensaje si el usuario es redirigido desde una ruta protegida
    const redirectMessage = location.state?.message || "";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.email || !formData.password) {
            return setError("Todos los campos son obligatorios.");
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión.");
            }

            login(data.user, data.token);
            console.log(data.user) // Guardar usuario en el contexto de autenticación
            setSuccess("Iniciando sesión. Redirigiendo...");
            if (data.user.role_name === "admin") {
                navigate("/panel-admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="sign__container">
                <img className="logo__header-sign" src="/logo_fiera.png" alt="logo" />
                <div className="header__sign">
                    <h2>¡Inicia Sesión en Fiera!</h2>
                    <p>Te espera una gran aventura</p>
                    {redirectMessage && (
                        <p className="warning-message-in">{redirectMessage}</p>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="inputs__sign">
                    {error && <p className="error-message-in">{error}</p>}
                    {success && <p className="success-message-in">{success}</p>}
                    <label>Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="example@example.com" required />
                    <label>Contraseña</label>
                    <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="************" required />
                    <button type="summit" className="btn_sign-in">Inicia sesión</button>
                </form>

                <p>¿No tienes cuenta?  <NavLink to={"/sign-up"} >Registrate</NavLink></p>


            </div>

        </>
    )
}

export default SignIn;
