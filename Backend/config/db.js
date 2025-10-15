import pkg from 'pg';
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URI,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log("Conectado a PostgreSQL en Supabase"))
    .catch((err) => {
        console.error("Error conectando a PostgreSQL:", err.message);
        process.exit(1);
    });

export default pool;
