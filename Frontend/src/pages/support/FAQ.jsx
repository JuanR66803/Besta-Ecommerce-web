import React from "react";

const preguntas = [
  {
    pregunta: "¿Cómo puedo cambiar mi contraseña?",
    respuesta:
      "Ve a tu perfil, selecciona 'Seguridad' y sigue las instrucciones para cambiar tu contraseña.",
  },
  {
    pregunta: "¿Dónde puedo ver mis pedidos?",
    respuesta:
      "Ingresa a la sección 'Mis pedidos' desde tu cuenta para revisar el historial.",
  },
  {
    pregunta: "¿Qué hago si tengo un problema con mi compra?",
    respuesta:
      "Puedes contactarnos a través del chat de ayuda o el formulario de soporte.",
  },
];

const FAQ = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Preguntas Frecuentes
      </h2>
      <div className="space-y-4">
        {preguntas.map((p, index) => (
          <details
            key={index}
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
          >
            <summary className="font-medium cursor-pointer">
              {p.pregunta}
            </summary>
            <p className="mt-2 text-gray-600">{p.respuesta}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
