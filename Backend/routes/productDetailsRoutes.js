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
router.patch("/disableProductDetailsById", productDetailsController.disableProduct);
router.patch("/enableProductDetailsById", productDetailsController.enableProduct);
router.get("/getAllProductDetails", productDetailsController.getAllProductDetails);
router.get("/getAllInhabilitados", productDetailsController.getAllInhabilitados);
router.get('/catalog', productDetailsController.getCatalogProducts); // Nuevo endpoint para el catálogo

export default router;