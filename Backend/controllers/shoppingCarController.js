import { ShoppingCarService } from "../services/shoppingCarService.js";
import { ItemStateService } from "../services/itemStateServices.js";

const shoppingCarService = new ShoppingCarService();
const itemStateService = new ItemStateService();

export class ShoppingCarController {
    async createShoppingCarItem(req, res) {
        try {
            const { id_product_details, quantity, id_user, price } = req.body;


            if (!id_product_details || !quantity || !id_user || !price) {
                return res.status(400).json({ message: "Los campos 'id_product_details', 'quantity', 'id_user' y 'price' son obligatorios" });
            }


            const total_price = quantity * price;
            const date = new Date().toISOString();
            const shoppingCar = await shoppingCarService.createShoppingCar(id_user, date, total_price);
            console.log(shoppingCar)

            const findItemState = await itemStateService.getItemStateByActive(true);
            console.log(findItemState)

            if (!findItemState) {
                return res.status(500).json({ message: "No se pudo encontrar el estado del artículo activo." });
            }

            const shoppingCarItem = await shoppingCarService.createShoppingCartItem(
                id_product_details,
                quantity,
                shoppingCar.id_shopping_cart,
                findItemState.id_item_state
            );

            return res.status(201).json({
                message: "Producto añadido al carrito correctamente",
                shoppingCarItem
            });

        } catch (err) {
            // Manejo de errores
            console.error("Error al crear el artículo del carrito:", err);
            return res.status(500).json({ message: "Ocurrió un error al procesar la solicitud" });
        }
    }
    async getShhoppingCar(req, res) {
        try {
            const id_user = Number(req.body.id_user);
            console.log("id del usuario", id_user)

            if (!id_user) {
                return res.status(400).json({ message: "El campo 'id_user' es obligatorio" });
            }
            const carItems = await shoppingCarService.getAllShoppingCarByIdUser(id_user);
            console.log("datos del carrito", carItems)
            if (!carItems.length) {
                return res.status(404).json({ message: "No hay productos en el carrito" });
            }
            return res.status(200).json({ carItems });
        } catch (err) {
            console.error("Error al obtener el carrito:", err);
            return res.status(500).json({ message: "Error al obtener los productos del carrito" });
        }
    }

}
