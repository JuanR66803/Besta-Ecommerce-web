import React from "react";
import "./ChatBox.css";

export default function ChatBox() {
/* 
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ChatBox() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Por favor completa todos los campos.");
      return;
    }
    // ... envío a /api/contact ...
  };

  return (
    <div className="chat-card">
      <div className="chat-header">
        <b>CONTÁCTANOS</b>
        <span className="status-dot" style={{ background: "#0066ff" }}></span>
      </div>
      <div className="chat-messages" style={{ padding: 20 }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
          <textarea placeholder="Describe tu problema..." value={message} onChange={(e) => setMessage(e.target.value)} rows={6} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" disabled={loading}>Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
*/
}