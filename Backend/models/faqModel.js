import pool from "../config/db.js"; // o tu conexión a PostgreSQL

export const FaqModel = {
  async getAllFaqs() {
    const query = "SELECT id_faq, question, answer FROM faq ORDER BY id_faq ASC";
    const result = await pool.query(query);
    return result.rows;
  },
};
