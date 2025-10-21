import express from "express";
import {WishListProductController} from "../controllers/wishListProductController.js";

const wishListProductController = new WishListProductController();

const router = express.Router();
router.post("/createWishListProduct", wishListProductController.createWishListProduct);
router.put("/updateWishListProductById", wishListProductController.updateWishListProduct);
router.delete("/deleteWishListProductById", wishListProductController.deleteWishListProductById);
router.get("/getAllWishListProducts", wishListProductController.getAllWishListProducts);
router.get("/getWishListProductById", wishListProductController.getWishListProductById);

export default router;
