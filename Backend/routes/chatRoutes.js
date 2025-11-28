import express from "express";
import { enviarMensajeChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", enviarMensajeChat);

export default router;
