import { MercadoPagoConfig, Preference } from "mercadopago";
import { v4 as uuidv4 } from "uuid";
import { PaymentMethodService } from "../services/paymentMethodServices.js";

// Crear cliente de Mercado Pago (MODO TEST)
const mpClient = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

export class PaymentMethodController {
    constructor() {
        this.paymentMethodService = new PaymentMethodService();
    }

    // ------------------------------
    // CRUD PAYMENT METHODS
    // ------------------------------

    async createPaymentMethod(req, res) {
        try {
            const newPaymentMethod = await this.paymentMethodService.createPaymentMethod(req.body);
            res.json(newPaymentMethod);
        } catch {
            res.status(500).json({ message: "Error creando método de pago" });
        }
    }

    async updatePaymentMethod(req, res) {
        try {
            const updated = await this.paymentMethodService.updatePaymentMethod(req.body);
            res.json(updated);
        } catch {
            res.status(500).json({ message: "Error actualizando método de pago" });
        }
    }

    async deletePaymentMethodById(req, res) {
        try {
            const deleted = await this.paymentMethodService.deletePaymentMethodById(req.body.id);
            res.json(deleted);
        } catch {
            res.status(500).json({ message: "Error eliminando método de pago" });
        }
    }

    async getAllPaymentMethods(req, res) {
        try {
            const list = await this.paymentMethodService.getAllPaymentMethods();
            res.json(list);
        } catch {
            res.status(500).json({ message: "Error obteniendo métodos de pago" });
        }
    }

    async getPaymentMethodById(req, res) {
        try {
            const method = await this.paymentMethodService.getPaymentMethodById(req.query.id);
            res.json(method);
        } catch {
            res.status(500).json({ message: "Error obteniendo método de pago" });
        }
    }

    // ------------------------------
    // MÉTODOS DE PAGO
    // ------------------------------

    // 🔵 MERCADO PAGO (SDK NUEVA)
async createMercadoPagoPreference(req, res) {
    try {
        const { items } = req.body;

        const preference = new Preference(mpClient);

        const response = await preference.create({
            body: {
                items: items.map(i => ({
                    title: i.product_name,               // ← antes: i.title
                    quantity: Number(i.quantity),        // ← asegurar número
                    currency_id: "COP",
                    unit_price: Number(i.product_price)  // ← antes: i.price
                })),
                back_urls: {
                    success: "http://localhost:5173/checkout/success",
                    failure: "http://localhost:5173/checkout/failure",
                    pending: "http://localhost:5173/checkout/pending"
                },
                // auto_return ELIMINADO
            }
        });

        res.json({ init_point: response.init_point });

    } catch (error) {
        console.error("MercadoPago error:", error);
        res.status(500).json({ message: "Error creando preferencia de Mercado Pago" });
    }
}


    // 🟡 EFECTY (SIMULADO)
    async createEfectyPayment(req, res) {
        try {
            const { total } = req.body;

            const paymentCode = "EFY-" + uuidv4().split("-")[0].toUpperCase();

            res.json({
                code: paymentCode,
                total,
                status: "pendiente",
                message: "Presenta este código en Efecty para pagar (simulado)"
            });

        } catch (error) {
            console.error("Efecty error:", error);
            res.status(500).json({ message: "Error generando pago Efecty" });
        }
    }
}
