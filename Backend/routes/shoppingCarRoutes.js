import express from "express";
import { ShoppingCarController } from "../controllers/shoppingCarController.js";


const shoppingCarController = new ShoppingCarController();

const router = express.Router();

router.post("/addCar", shoppingCarController.createShoppingCarItem);
router.post("/getCar", shoppingCarController.getShhoppingCar)
router.delete("/deleteItem/:id_shopping_cart_item", (req, res) =>
  shoppingCarController.deleteCartItem(req, res)
);
router.put("/updateQuantity", (req, res) =>
  shoppingCarController.updateCartItemQuantity(req, res)
);
export default router;