import express from "express";
import {SaleOrderItemController} from "../controllers/saleOrderItemController.js";

const saleOrderItemController = new SaleOrderItemController();

const router = express.Router();
router.post("/createSaleOrderItem", saleOrderItemController.createSaleOrderItem);
router.put("/updateSaleOrderItemById", saleOrderItemController.updateSaleOrderItem);
router.delete("/deleteSaleOrderItemById", saleOrderItemController.deleteSaleOrderItemById);
router.get("/getAllSaleOrderItems", saleOrderItemController.getAllSaleOrderItems);
router.get("/getSaleOrderItemById", saleOrderItemController.getSaleOrderItemById);

export default router;
