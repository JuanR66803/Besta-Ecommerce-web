import express from "express";
import {ColorController} from "../controllers/colorController.js";

const colorController = new ColorController();

const router = express.Router();
router.post("/createColor", colorController.createColor);
router.put("/updateColorById", colorController.updateColor);
router.delete("/deleteColorById", colorController.deleteColorById);
router.get("/getAllColors", colorController.getAllColors);
router.get("/getColorById", colorController.getColorById);

export default router;

