import express from "express";
import {ProductStateController} from "../controllers/productStateController.js";

const productStateController = new ProductStateController();

const router = express.Router();
router.post("/createProductState", productStateController.createProductState);
router.put("/updateProductStateById", productStateController.updateProductState);
router.delete("/deleteProductStateById", productStateController.deleteProductStateById);
router.get("/getAllProductStates", productStateController.getAllProductStates);
router.get("/getProductStateById", productStateController.getProductStateById);

export default router;

