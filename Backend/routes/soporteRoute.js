import express from "express";
import { enviarMensajeSoporte } from "../controllers/soporteController.js";

const router = express.Router();
router.post("/", enviarMensajeSoporte);

export default router;
