import React from "react";
import "./contact.css";
import FAQCategories from "./components/FAQ";

export default function Contact() {
  return (
    <div className="help-container faq-full">
      <div className="help-left">
        <h1>¿CÓMO PODEMOS AYUDARTE?</h1>

        <div className="faq-section">
          <h3>PREGUNTAS FRECUENTES</h3>
          <FAQCategories />
        </div>
      </div>
    </div>
  );
}
