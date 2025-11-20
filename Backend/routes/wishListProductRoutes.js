import express from 'express';
import { WishListProductController } from '../controllers/wishListProductController.js';

const wishListProductController = new WishListProductController();
const router = express.Router();

// Rutas actualizadas para el frontend
router.post('/add', (req, res) =>
  wishListProductController.createWishListProduct(req, res)
);
router.delete('/remove', (req, res) =>
  wishListProductController.removeFromWishList(req, res)
);
router.get('/check/:userId/:productId', (req, res) =>
  wishListProductController.checkInWishList(req, res)
);
router.get('/:userId', (req, res) =>
  wishListProductController.getWishListByUser(req, res)
);
router.delete('/clear/:userId', (req, res) =>
  wishListProductController.clearWishList(req, res)
);
router.get('/count/:userId', (req, res) =>
  wishListProductController.getWishListCount(req, res)
);

// Rutas antiguas (mantener compatibilidad)
router.post('/createWishListProduct', (req, res) =>
  wishListProductController.createWishListProduct(req, res)
);
router.put('/updateWishListProductById', (req, res) =>
  wishListProductController.updateWishListProduct(req, res)
);
router.delete('/deleteWishListProductById', (req, res) =>
  wishListProductController.deleteWishListProductById(req, res)
);
router.get('/getAllWishListProducts', (req, res) =>
  wishListProductController.getAllWishListProducts(req, res)
);
router.get('/getWishListProductById', (req, res) =>
  wishListProductController.getWishListProductById(req, res)
);

export default router;
