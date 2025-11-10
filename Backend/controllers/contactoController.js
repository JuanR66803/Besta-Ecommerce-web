import { ContactoModel } from "../models/contactoModel.js";

export const enviarContacto = async (req, res) => {
  try {
    const { nombre, correo, asunto, mensaje } = req.body;
    await ContactoModel.guardarContacto({ nombre, correo, asunto, mensaje });
    res.status(201).json({ message: "Mensaje de contacto guardado correctamente" });
    console.log("📩 Mensaje recibido del contacto:", req.body);
  } catch (error) {
    console.error("Error guardando contacto:", error);
    res.status(500).json({ message: "Error al guardar el mensaje de contacto" });
  }
};

