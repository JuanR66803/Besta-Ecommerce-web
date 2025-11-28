import express from "express";
import { enviarContacto } from "../controllers/contactoController.js";

const router = express.Router();

router.post("/", enviarContacto);

export default router;
