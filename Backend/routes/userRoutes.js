import express from "express";
import UserController from "../controllers/userController.js";

const userController = new UserController();

const router = express.Router();
router.post("/createUser", userController.registerUser);
router.get("/getAllUsers", userController.getAllUsers);

export default router;
