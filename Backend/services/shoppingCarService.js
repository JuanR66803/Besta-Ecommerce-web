import { ShoppingCarModel } from "../models/shoppingCarModel.js";

const shoppingCartModel = new ShoppingCarModel();
export class ShoppingCarService {
  async createShoppingCartItem(
    id_product_details,
    quantity,
    id_shopping_cart,
    id_state
  ) {
    return shoppingCartModel.createShoppingCarItem(
      id_product_details,
      quantity,
      id_shopping_cart,
      id_state
    );
  }
  async createShoppingCar(id_user, date, total_price) {
    return shoppingCartModel.createShoppingCar(id_user, date, total_price);
  }
  async getAllShoppingCarByIdUser(id_user) {
    return shoppingCartModel.getAllProductCar(id_user);
  }
  async deleteCartItem(id_shopping_cart_item) {
    return shoppingCartModel.deleteCartItem(id_shopping_cart_item);
  }
  async updateCartItemQuantity(id_shopping_cart_item, quantity) {
    return shoppingCartModel.updateCartItemQuantity(
      id_shopping_cart_item,
      quantity
    );
  }
}
