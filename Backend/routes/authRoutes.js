import { AuthController } from "../controllers/authController";
import express from "express";

const authController = new AuthController();

const router = express.Router();
router.post("/register", authController.registerUser);

export default router;
