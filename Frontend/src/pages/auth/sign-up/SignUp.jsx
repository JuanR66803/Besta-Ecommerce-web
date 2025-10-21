import "./SignUp.css"
import { useState } from "react";


const SignUp = () =>{
    const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/register` || "http://localhost:4000/api/auth/register";
    const [form, setForm] = useState({
        fullname:'',
        email:'',
        password:'',
        confirmPassword:'',
        birthDate:'',
        phone:''
    })
    const [submitting, setSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev =>({...prev,[name]: value}));
    };

    const validatePassword =()=>{
        // Lógica para confirmar la contraseña
        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return false;
        }
        return true;   
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!validatePassword()) return;
        setSubmitting(true);
        try{
            const res = await fetch(API_URL,{
                method:"POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify({
                    fullname: form.fullname,
                    email: form.email,
                    password: form.password,
                    birthDate: form.birthDate,
                    phone: form.phone
                })
            });
            if(!res.ok){
                const err = await res.json();
                throw new Error(err.message || "Error en el registro de datos");
            }
            const data = await res.json();
            console.log("Registrado: ",data);
        }catch(err){
            console.error("Error en el envío del formulario: ", err);
            alert(err.message);
        }finally{
            setSubmitting(false);
        }
    }
    
    return(
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
                        <input name="email" type="email" value = {form.email} onChange={handleChange} placeholder="example@example.com" required />
                        <label htmlFor="password">Contraseña</label>
                        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="********" required />
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input name="confirmpassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="********" required />
                        <label htmlFor="Age">Fecha de nacimiento</label>
                        <input name="date" type="date" value={form.birthDate} onChange={handleChange} required />
                        <label htmlFor="phone">Número de teléfono</label>
                        <input name="tel" type="tel" value={form.phone} onChange={handleChange} placeholder="+57 300 123 4567" required />
                        <button type="submit" className="sign-up-button">Crear cuenta</button>
                    </form>
                </section>
                
            </div>
        </>
    )
}

export default SignUp;