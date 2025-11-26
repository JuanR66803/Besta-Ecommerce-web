import pool from "../config/db.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "juancrg2004@hotmail.com";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "Todos los campos son obligatorios" });

    const insertQuery = `INSERT INTO contacts (name, email, message) VALUES ($1,$2,$3) RETURNING *`;
    const values = [name, email, message];
    const result = await pool.query(insertQuery, values);

    // For now we just return the saved contact. Notification options: email, websocket, or admin dashboard polling.
    return res.status(201).json({ message: "Mensaje recibido", contact: result.rows[0] });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const listContacts = async (req, res) => {
  try {
    // require admin: verifyToken middleware should put req.user
    const requesterEmail = req.user?.email;
    if (!requesterEmail || requesterEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const result = await pool.query(`SELECT * FROM contacts ORDER BY created_at DESC`);
    return res.json(result.rows);
  } catch (error) {
    console.error("Error listing contacts:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export default { createContact, listContacts };
