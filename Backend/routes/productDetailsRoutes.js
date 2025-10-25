import express from "express";
import multer from "multer"; // 1. Importar Multer
import { ProductDetailsController } from "../controllers/productDetailsController.js";

// 2. Configuración de Multer
// Esto configura Multer para guardar los archivos temporalmente en una carpeta 'uploads/'
const upload = multer({ dest: 'uploads/' });

const productDetailsController = new ProductDetailsController();
const router = express.Router();
router.get('/getAllProductDetails', (req, res) =>
  productDetailsController.getAllProductDetails(req, res)
);

router.get('/getProductDetailById/:id_product', (req, res) =>
  productDetailsController.getProductDetailById(req, res)
);
// Usamos upload.single('image') como middleware:
// - 'image' debe coincidir con la clave usada en el FormData del frontend.
// - Multer procesará la imagen y la adjuntará a req.file antes de pasar al controlador.
router.post(
    "/createProductDetails", 
    upload.single('image'), 
    productDetailsController.createProductDetails
);

// Rutas restantes (no necesitan Multer)
router.put("/updateProductDetailsById", productDetailsController.updateProductDetails);
router.delete("/deleteProductDetailsById", productDetailsController.deleteProductDetailsById);
router.get("/getAllProductDetails", productDetailsController.getAllProductDetails);
router.get("/getProductDetailsById", productDetailsController.getProductDetailsById);

export default router;