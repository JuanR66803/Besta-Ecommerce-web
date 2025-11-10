import { useState } from "react";

const ChatAyuda = () => {
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    setMensajes([...mensajes, { texto: mensaje, emisor: "usuario" }]);
    setMensaje("");
    // Simulación de respuesta automática
    setTimeout(() => {
      setMensajes((prev) => [
        ...prev,
        { texto: "Gracias por tu mensaje, pronto te atenderemos 😊", emisor: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[400px] border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`my-2 p-2 rounded-lg max-w-xs ${
              m.emisor === "usuario"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-gray-300 text-gray-800 self-start mr-auto"
            }`}
          >
            {m.texto}
          </div>
        ))}
      </div>
      <form onSubmit={enviarMensaje} className="p-3 flex border-t bg-white">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 border rounded-lg p-2 mr-2 focus:outline-none"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatAyuda;
