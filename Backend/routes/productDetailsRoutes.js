import express from "express";
import multer from "multer"; // 1. Importar Multer
import { ProductDetailsController } from "../controllers/productDetailsController.js";

const upload = multer({ dest: 'uploads/' });

const productDetailsController = new ProductDetailsController();
const router = express.Router();

router.post(
    "/createProductDetails", 
    upload.array('images',10), 
    productDetailsController.createProductDetails
);

router.put("/updateProductDetailsById", productDetailsController.updateProductDetails);
router.delete("/deleteProductDetailsById", productDetailsController.deleteProductDetailsById);
router.get("/getAllProductDetails", productDetailsController.getAllProductDetails);
router.get("/getProductDetailsById", productDetailsController.getProductDetailsById);

export default router;