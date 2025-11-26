import React, { useState } from "react";
import "./FAQ.css";

const DATA = [
  {
    title: "Envíos y Seguimiento",
    questions: [
      { q: "¿Cuánto tarda el envío?", a: "Normalmente 3-7 días hábiles según la región." },
      { q: "¿Puedo rastrear mi pedido?", a: "Sí, recibes un número de rastreo cuando se despacha." }
    ]
  },
  {
    title: "Devoluciones y Cambios",
    questions: [
      { q: "¿Cómo devuelvo un producto?", a: "Solicita la devolución desde 'Mis pedidos' y sigue los pasos." }
    ]
  },
  {
    title: "Pagos y Facturación",
    questions: [
      { q: "¿Qué medios de pago aceptan?", a: "Tarjetas, PSE y pago contra entrega (según ciudad)." }
    ]
  },
  {
    title: "Cuenta y Pedidos",
    questions: [
      { q: "¿Dónde veo mis pedidos?", a: "En tu perfil dentro de 'Mis Compras'." }
    ]
  }
];

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState({});

  const toggleCategory = (i) => {
    setOpenCategory(openCategory === i ? null : i);
    setOpenQuestion({});
  };

  const toggleQuestion = (catIdx, qIdx) => {
    setOpenQuestion((prev) => ({ ...prev, [catIdx]: prev[catIdx] === qIdx ? null : qIdx }));
  };

  return (
    <div className="faq-cat-container">
      {DATA.map((cat, i) => (
        <div key={i} className={`faq-cat-block ${openCategory === i ? "open" : ""}`}>
          <div className="faq-cat-item" onClick={() => toggleCategory(i)}>
            <span className="faq-icon">{openCategory === i ? "−" : "+"}</span>
            <span>{cat.title}</span>
          </div>

          {openCategory === i && (
            <div className="faq-questions">
              {cat.questions.map((qq, qi) => (
                <div key={qi} className="faq-question-block">
                  <div className="faq-question" onClick={() => toggleQuestion(i, qi)}>
                    {qq.q}
                  </div>

                  {openQuestion[i] === qi && (
                    <div className="faq-answer">{qq.a}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
