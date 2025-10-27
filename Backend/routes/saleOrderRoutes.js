import express from "express";
import {SaleOrderController} from "../controllers/saleOrderController.js";

const saleOrderController = new SaleOrderController();

const router = express.Router();
router.post("/createSaleOrder", saleOrderController.createSaleOrder);
router.put("/updateSaleOrderById", saleOrderController.updateSaleOrder);
router.delete("/deleteSaleOrderById", saleOrderController.deleteSaleOrderById);
router.get("/getAllSaleOrders", saleOrderController.getAllSaleOrders);
router.get("/getSaleOrderById", saleOrderController.getSaleOrderById);

export default router;