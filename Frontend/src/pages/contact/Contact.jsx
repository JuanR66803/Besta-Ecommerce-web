
import React, { useState } from "react";
import "./Contact.css";
import FAQCategories from "./components/FAQ";


export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xangdjbj", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });
      const data = await res.json();
      if (data.ok) {
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Error al enviar el mensaje. Intenta de nuevo.");
      }
    } catch (err) {
      alert("Error al enviar el mensaje. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="help-container">
      <div className="help-left">
        <h1>¿CÓMO PODEMOS AYUDARTE?</h1>
        <div className="faq-section">
          <h3>PREGUNTAS FRECUENTES</h3>
          <FAQCategories />
        </div>
      </div>
      <div className="help-right">
        <h2>Contáctanos</h2>
  <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
          {sent && <div className="success-msg">¡Mensaje enviado correctamente!</div>}
        </form>
      </div>
    </div>
  );
}
