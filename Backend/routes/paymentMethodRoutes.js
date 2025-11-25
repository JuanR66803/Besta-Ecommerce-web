import express from "express";
import { PaymentMethodController } from "../controllers/paymentMethodController.js";

const paymentMethodController = new PaymentMethodController();
const router = express.Router();

// CRUD de métodos de pago
router.post("/createPaymentMethod", paymentMethodController.createPaymentMethod);
router.put("/updatePaymentMethodById", paymentMethodController.updatePaymentMethod);
router.delete("/deletePaymentMethodById", paymentMethodController.deletePaymentMethodById);
router.get("/getAllPaymentMethods", paymentMethodController.getAllPaymentMethods);
router.get("/getPaymentMethodById", paymentMethodController.getPaymentMethodById);

// Métodos de pago simulados (MercadoPago + Efecty)
router.post("/create_preference", paymentMethodController.createMercadoPagoPreference);
router.post("/efecty", paymentMethodController.createEfectyPayment);

export default router;
