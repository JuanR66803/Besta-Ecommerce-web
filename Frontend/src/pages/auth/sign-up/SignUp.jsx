import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.css"
import { useState } from "react";
import React from "react";

const SignUp = () => {
    // usa el BASE del backend (ajusta el puerto si tu server corre en otro)
    const API_URL_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    const API_URL = `${API_URL_BASE}/api/auth/register`;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        phone: ''
    })
    const [submitting, setSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validatePassword = () => {
        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return false;
        }
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;
        setSubmitting(true);
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    fullname: form.fullname,
                    email: form.email,
                    password: form.password,
                    birthDate: form.birthDate,
                    phone: form.phone
                })
            });

            if (!res.ok) {
                // intenta parsear mensaje de error si viene JSON, si no, usar statusText
                let errMsg = res.statusText || "Error en el registro";
                try {
                    const errJson = await res.json();
                    errMsg = errJson.message || JSON.stringify(errJson);
                } catch { }
                throw new Error(errMsg);
            }

            // algunos endpoints responden sin cuerpo (204); proteger contra parseo inválido
            let data = null;
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                data = await res.json();
            }
            console.log("Registrado: ", data);
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            navigate("/sign-in");
        } catch (err) {
            console.error("Error en el envío del formulario: ", err);
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className="sign-up-container">
                <setion className="image-section">
                    <img src="./background-signup.jpg" alt="signup" />
                </setion>
                <section className="form-section">
                    <h2>¡Es tu momento de ser una fiera!</h2>
                    <p>Regístrate para estar enterado de lo mejor del deporte</p>
                    <form className="sign-up-form" onSubmit={handleSubmit}>
                        <label htmlFor="fullName">Nombre completo</label>
                        <input name="fullname" type="text" value={form.fullname} onChange={handleChange} placeholder="Juan C . perez" required />
                        <label htmlFor="email">Correo electrónico</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@example.com" required />
                        <label htmlFor="password">Contraseña</label>
                        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="********" required />
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="********" required />
                        <label htmlFor="Age">Fecha de nacimiento</label>
                        <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} required />
                        <label htmlFor="phone">Número de teléfono</label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+57 300 123 4567" required />
                        <button type="submit" className="sign-up-button" disabled={submitting}>{submitting ? "Creando..." : "Crear cuenta"}</button>
                    </form>
                    <p>¿No tienes cuenta? <NavLink to={"/sign-in"}>Inicia Sesión</NavLink></p>
                </section>

            </div>
        </>
    )
}

export default SignUp;