import express from "express";
import { ItemStateController } from "../controllers/itemStateController.js";

const router = express.Router();
const itemStateController = new ItemStateController();

// envolver los métodos para garantizar que sean funciones válidas y mantener el this
router.post("/createItemState", (req, res) => itemStateController.createItemState(req, res));
router.put("/updateItemState", (req, res) => itemStateController.updateItemState(req, res));
router.delete("/deleteItemStateById", (req, res) => itemStateController.deleteItemStateById(req, res));
router.get("/getItemStateById/:id", (req, res) => itemStateController.getItemStateById(req, res));
router.get("/getAllItemStates", (req, res) => itemStateController.getAllItemStates(req, res));

export default router;
