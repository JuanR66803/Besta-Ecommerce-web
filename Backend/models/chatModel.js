import pool from "../config/db.js";

export const ChatModel = {
  async guardarMensaje(usuario_id, mensaje) {
    const query = "INSERT INTO chat_soporte (usuario_id, mensaje) VALUES ($1, $2)";
    await pool.query(query, [usuario_id, mensaje]);
  },
};
