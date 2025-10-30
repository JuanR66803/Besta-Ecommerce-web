import express from "express";
import { ShoppingCarController } from "../controllers/shoppingCarController.js";


const shoppingCarController = new ShoppingCarController();

const router = express.Router();

router.post("/addCar", shoppingCarController.createShoppingCarItem);
router.post("/getCar", shoppingCarController.getShhoppingCar)

export default router;