import { ShoppingCarModel } from "../models/shoppingCarModel.js";

const shoppingCartModel = new ShoppingCarModel();
export class ShoppingCarService{
    async createShoppingCartItem(id_product_details, quantity, id_shopping_cart, id_state) {
        return (shoppingCartModel.createShoppingCarItem(id_product_details, quantity, id_shopping_cart, id_state));
    };
    async createShoppingCar(id_user, date, total_price){
        return (shoppingCartModel.createShoppingCar(id_user, date, total_price))
    }
    async getAllShoppingCarByIdUser(id_user){
        return (shoppingCartModel.getAllProductCar(id_user))
    }
}