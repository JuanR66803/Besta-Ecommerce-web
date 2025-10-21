import express from "express";
import {ItemStateController} from "../controllers/item_stateController.js";

const item_stateController = new ItemStateController();

const router = express.Router();
router.post("/createItemState", item_stateController.createItemState);
router.put("/updateItemStateById", item_stateController.updateItemState);
router.delete("/deleteItemStateById", item_stateController.deleteItemStateById);
router.get("/getAllCategories", item_stateController.getAllCategories);
router.get("/getItemStateById", item_stateController.getItemStateById);

export default router;
