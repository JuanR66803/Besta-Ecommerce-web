import "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.DATABASE_URI) {
    console.error("❌ ERROR: La variable de entorno DATABASE_URI no está definida.");
    process.exit(1);
}

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
//rutas
app.use("/api", productRouter)
app.get("/", (req, res) => {
    res.json({ message: "backend funcionando correctamente" });
});

app.listen(PORT, () => {
    console.log(` https:localhost:${PORT}`);
});

export default app;
