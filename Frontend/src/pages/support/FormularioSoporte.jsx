import React, { useState } from "react";
import axios from "axios";

const FormularioSoporte = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/soporte", form);
      setEnviado(true);
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch (err) {
      console.error("Error enviando soporte:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Contactar Soporte
      </h2>

      {enviado ? (
        <p className="text-green-600 font-semibold">
          ✅ Tu mensaje fue enviado correctamente. Te responderemos pronto.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="asunto"
            placeholder="Asunto"
            value={form.asunto}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <textarea
            name="mensaje"
            placeholder="Describe tu problema o duda..."
            value={form.mensaje}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg h-32"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
};

export default FormularioSoporte;
