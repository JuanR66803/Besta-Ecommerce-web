import mercadopago from "mercadopago";
import { v4 as uuidv4 } from "uuid";
import { PaymentMethodService } from "../services/paymentMethodServices.js";

// Configurar Mercado Pago (MODO TEST)
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN  // tu token TEST
});

export class PaymentMethodController {
    constructor() {
        this.paymentMethodService = new PaymentMethodService();
    }

    // ------------------------------
    // CRUD de Métodos de Pago
    // ------------------------------

    async createPaymentMethod(req, res) {
        try {
            const newPaymentMethod = await this.paymentMethodService.createPaymentMethod(req.body);
            res.json(newPaymentMethod);
        } catch (error) {
            res.status(500).json({ message: "Error creando método de pago" });
        }
    }

    async updatePaymentMethod(req, res) {
        try {
            const updated = await this.paymentMethodService.updatePaymentMethod(req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: "Error actualizando método de pago" });
        }
    }

    async deletePaymentMethodById(req, res) {
        try {
            const deleted = await this.paymentMethodService.deletePaymentMethodById(req.body.id);
            res.json(deleted);
        } catch (error) {
            res.status(500).json({ message: "Error eliminando método de pago" });
        }
    }

    async getAllPaymentMethods(req, res) {
        try {
            const list = await this.paymentMethodService.getAllPaymentMethods();
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: "Error obteniendo métodos de pago" });
        }
    }

    async getPaymentMethodById(req, res) {
        try {
            const method = await this.paymentMethodService.getPaymentMethodById(req.query.id);
            res.json(method);
        } catch (error) {
            res.status(500).json({ message: "Error obteniendo método de pago" });
        }
    }

    // ------------------------------
    // MÉTODOS DE PAGO REALES
    // ------------------------------

    // 🔵 MERCADO PAGO (MODO TEST)
    async createMercadoPagoPreference(req, res) {
        try {
            const { items, total } = req.body;

            const preference = {
                items: items.map(i => ({
                    title: i.title,
                    quantity: i.quantity,
                    currency_id: "COP",
                    unit_price: Number(i.price)
                })),
                back_urls: {
                    success: "http://localhost:5173/checkout/success",
                    failure: "http://localhost:5173/checkout/failure",
                    pending: "http://localhost:5173/checkout/pending"
                },
                auto_return: "approved"
            };

            const response = await mercadopago.preferences.create(preference);

            res.json({ init_point: response.body.init_point });

        } catch (error) {
            console.error("MercadoPago error:", error);
            res.status(500).json({ message: "Error creando preferencia de Mercado Pago" });
        }
    }

    // 🟡 EFECTY (SIMULADO)
    async createEfectyPayment(req, res) {
        try {
            const { total } = req.body;

            // Generar código simulado
            const paymentCode = "EFY-" + uuidv4().split("-")[0].toUpperCase();

            const simulatedPayment = {
                code: paymentCode,
                total,
                status: "pendiente",
                message: "Presenta este código en un punto Efecty para realizar el pago (simulado)"
            };

            res.json(simulatedPayment);

        } catch (error) {
            console.error("Efecty error:", error);
            res.status(500).json({ message: "Error generando pago Efecty simulado" });
        }
    }
}
