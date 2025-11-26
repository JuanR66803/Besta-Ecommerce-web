import React, { useState } from "react";
import "./MessageInput.css";

export default function MessageInput({ onSend }) {
  const [msg, setMsg] = useState("");

  const handleSend = () => {
    const text = msg.trim();
    if (!text) return;
    onSend(text);
    setMsg("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        className="message-input__input"
      />
      <button onClick={handleSend} className="message-input__button">
        Enviar
      </button>
    </div>
  );
}
