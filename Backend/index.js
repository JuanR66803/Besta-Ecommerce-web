import "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js"
import productDetailsRoutes from "./routes/productDetailsRoutes.js" 
import paymentMethodRoutes from "./routes/paymentMethodRoutes.js"
import saleOrderRoutes from "./routes/saleOrderRoutes.js" 
import saleOrderItemRoutes from "./routes/saleOrderItemRoutes.js" 
import userAddressRoutes from "./routes/userAddressRoutes.js" 
import wishListProductRoutes from "./routes/wishListProductRoutes.js" 
import productRoutes from './routes/productRoutes.js';
import shoppingCarRoutes from './routes/shoppingCarRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.DATABASE_URI) {
    console.error("ERROR: La variable de entorno DATABASE_URI no está definida.");
    process.exit(1);
}

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
//rutas


app.use("/api/category", categoryRoutes)//enrutamiento a las categorias
app.use("/api/auth", authRoutes);//enrutamiento a la autenticacion
app.use("/api/subCategory", subCategoryRoutes)//enrutamiento a las sub categorias
app.use("/api/productDetails", productDetailsRoutes)//enrutamiento a los detalles de los productos
app.use("/api/paymentMethod", paymentMethodRoutes)//enrutamiento a metodos de pago
app.use("/api/saleOrder", saleOrderRoutes)//enrutamiento a los items de las ordenes de venta
app.use("/api/saleOrderItem", saleOrderItemRoutes)//enrutamiento a los items de las ordenes de venta
app.use("/api/userAddressItem", userAddressRoutes)//enrutamiento a las direcciones del usuario
app.use("/api/wishListProduct", wishListProductRoutes)//enrutamiento a los productos en la lista de deseados
app.use("/api/shoppingCar", shoppingCarRoutes)//enrutamiento carrito de compras
app.use('/api/product', productRoutes);

app.get("/", (req, res) => {
    res.json({ message: "backend funcionando correctamente" });
});

app.listen(PORT, () => {
    console.log(` https:localhost:${PORT}`);
});

export default app;
