import AuthController from "../controllers/authController.js";
import express from "express";

const authController = new AuthController();

const router = express.Router();
router.post("/register", authController.registerUser);

export default router;
