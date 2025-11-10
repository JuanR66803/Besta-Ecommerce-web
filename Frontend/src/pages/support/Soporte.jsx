import React, { useState, useEffect } from 'react';
import { MessageCircle, HelpCircle, Mail } from 'lucide-react';
import '../../style/Soporte.css';

const Soporte = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [faqs, setFaqs] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [contacto, setContacto] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  // 📌 Cargar FAQ desde la base de datos
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/faq');
        if (!res.ok) throw new Error('Error obteniendo FAQs');
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error cargando FAQs:', error);
      }
    };
    fetchFaqs();
  }, []);

  // 📌 Enviar mensaje al chat
  const enviarChat = async () => {
    if (!mensaje.trim()) {
      alert('Por favor escribe un mensaje antes de enviarlo.');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje }),
      });
      if (res.ok) {
        alert('Mensaje enviado al soporte.');
        setMensaje('');
      } else {
        alert('Error al enviar el mensaje.');
      }
    } catch (error) {
      console.error('Error en el chat:', error);
      alert('Error de conexión con el servidor.');
    }
  };

  // 📌 Enviar formulario de contacto
  const enviarContacto = async (e) => {
    e.preventDefault();
    const { nombre, correo, asunto, mensaje } = contacto;

    if (!nombre || !correo || !asunto || !mensaje) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto),
      });
      if (res.ok) {
        alert('Tu mensaje ha sido enviado.');
        setContacto({ nombre: '', correo: '', asunto: '', mensaje: '' });
      } else {
        alert('Error al enviar el formulario.');
      }
    } catch (error) {
      console.error('Error enviando contacto:', error);
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="soporte-container">
      <div className="soporte-card">
        <h1 className="soporte-title">Centro de Soporte</h1>

        {/* Tabs */}
        <div className="soporte-tabs">
          <button
            className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <HelpCircle size={18} /> Preguntas Frecuentes
          </button>
          <button
            className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageCircle size={18} /> Chat de Ayuda
          </button>
          <button
            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <Mail size={18} /> Contactar Soporte
          </button>
        </div>

        {/* Contenido */}
        <div className="soporte-content">
          {/* 📘 PREGUNTAS FRECUENTES */}
          {activeTab === 'faq' && (
            <div className="faq-section">
              <h2>Preguntas Frecuentes</h2>
              {faqs.length > 0 ? (
                faqs.map((faq) => (
                  <details key={faq.id_faq} className="faq-item">
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))
              ) : (
                <p className="no-faq">No hay preguntas frecuentes disponibles.</p>
              )}
            </div>
          )}

          {/* 💬 CHAT DE AYUDA */}
          {activeTab === 'chat' && (
            <div className="chat-section">
              <h2>Chat de Ayuda</h2>
              <textarea
                placeholder="Escribe tu mensaje..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
              <button onClick={enviarChat}>Enviar</button>
            </div>
          )}

          {/* 📩 CONTACTO */}
          {activeTab === 'contact' && (
            <div className="contact-section">
              <h2>Contactar Soporte</h2>
              <form onSubmit={enviarContacto}>
                <input
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={contacto.nombre}
                  onChange={(e) =>
                    setContacto({ ...contacto, nombre: e.target.value })
                  }
                  required
                />
                <input
                  name="correo"
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={contacto.correo}
                  onChange={(e) =>
                    setContacto({ ...contacto, correo: e.target.value })
                  }
                  required
                />
                <input
                  name="asunto"
                  type="text"
                  placeholder="Asunto"
                  value={contacto.asunto}
                  onChange={(e) =>
                    setContacto({ ...contacto, asunto: e.target.value })
                  }
                  required
                />
                <textarea
                  name="mensaje"
                  placeholder="Describe tu problema o duda..."
                  value={contacto.mensaje}
                  onChange={(e) =>
                    setContacto({ ...contacto, mensaje: e.target.value })
                  }
                  required
                ></textarea>
                <button type="submit">Enviar</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Soporte;
