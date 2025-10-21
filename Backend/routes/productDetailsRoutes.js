import express from "express";
import {ProductDetailsController} from "../controllers/productDetailsController.js";

const productDetailsController = new ProductDetailsController();

const router = express.Router();
router.post("/createProductDetails", productDetailsController.createProductDetails);
router.put("/updateProductDetailsById", productDetailsController.updateProductDetails);
router.delete("/deleteProductDetailsById", productDetailsController.deleteProductDetailsById);
router.get("/getAllProductDetails", productDetailsController.getAllProductDetails);
router.get("/getProductDetailsById", productDetailsController.getProductDetailsById);

export default router;

