import express from "express";
import {PaymentMethodController} from "../controllers/paymentMethodController.js";

const paymentMethodController = new PaymentMethodController();

const router = express.Router();
router.post("/createPaymentMethod", paymentMethodController.createPaymentMethod);
router.put("/updatePaymentMethodById", paymentMethodController.updatePaymentMethod);
router.delete("/deletePaymentMethodById", paymentMethodController.deletePaymentMethodById);
router.get("/getAllPaymentMethods", paymentMethodController.getAllPaymentMethods);
router.get("/getPaymentMethodById", paymentMethodController.getPaymentMethodById);

export default router;

