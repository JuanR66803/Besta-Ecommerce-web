import AuthController from "../controllers/authController.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const authController = new AuthController();

const router = express.Router();
router.post("/register", authController.registerUser);
router.post("/login", authController.LoginUser);
// Endpoint para verificar en servidor si el usuario tiene permisos de admin
router.get("/verify-admin", verifyToken, authController.verifyAdmin.bind(authController));

export default router;
