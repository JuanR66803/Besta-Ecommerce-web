import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const router = express.Router();

// Inicializa Mercado Pago con tu token
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

router.post("/create_preference", async (req, res) => {
  try {
    const { title, price, quantity } = req.body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title,
            unit_price: Number(price),
            quantity: Number(quantity),
          },
        ],
        back_urls: {
          success: "http://localhost:5173/success",
          failure: "http://localhost:5173/failure",
          pending: "http://localhost:5173/pending",
        },
        auto_return: "approved",
      },
    });

    res.json({
      id: result.id,
      init_point: result.init_point,
    });
  } catch (error) {
    console.error("❌ Error al crear la preferencia:", error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

export default router;
