import pool from "../config/db.js";

export const ContactoModel = {
  async guardarContacto({ nombre, correo, asunto, mensaje }) {
    const query = `
      INSERT INTO contacto_soporte (nombre, correo, asunto, mensaje)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [nombre, correo, asunto, mensaje]);
  },
};
