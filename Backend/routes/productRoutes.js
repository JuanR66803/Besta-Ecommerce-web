import express from "express";
import {ProductController} from "../controllers/productController.js";

const productController = new ProductController();

const router = express.Router();
router.post("/createProduct", productController.createProduct);
router.put("/updateProductById", productController.updateProduct);
router.delete("/deleteProductById", productController.deleteProductById);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProductById", productController.getProductById);

export default router;

