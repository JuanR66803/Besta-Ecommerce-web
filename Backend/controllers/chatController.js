import { ChatModel } from "../models/chatModel.js";

export const enviarMensajeChat = async (req, res) => {
  try {
    const { usuario_id, mensaje } = req.body;
    await ChatModel.guardarMensaje(usuario_id, mensaje);
    res.status(201).json({ message: "Mensaje guardado correctamente" });
    console.log("💬 Mensaje recibido del chat:", req.body);
  } catch (error) {
    console.error("Error guardando mensaje:", error);
    res.status(500).json({ message: "Error al guardar el mensaje" });
  }
};


