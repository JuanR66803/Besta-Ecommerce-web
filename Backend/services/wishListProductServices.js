import { WishListProductModel } from '../models/wishListProductModel.js';

const wishListProductModel = new WishListProductModel();

export class WishListProductService {
  /**
   * Crear un producto en la wishlist
   * Verifica duplicados antes de agregar
   */
  async createWishListProduct(id_product_details, id_users) {
    try {
      // Verificar si ya existe
      const exists = await wishListProductModel.isInWishList(
        id_users,
        id_product_details
      );

      if (exists) {
        throw new Error('El producto ya está en tu lista de deseos');
      }

      return await wishListProductModel.createWishListProduct(
        id_product_details,
        id_users
      );
    } catch (error) {
      console.error('[WishListService] Error al crear:', error);
      throw error;
    }
  }

  /**
   * Actualizar un producto de la wishlist
   */
  async updateWishListProduct(
    id_wish_list_products,
    id_product_details,
    id_users
  ) {
    return await wishListProductModel.updateWishListProductById(
      id_wish_list_products,
      id_product_details,
      id_users
    );
  }

  /**
   * Eliminar por ID de wishlist
   */
  async deleteWishListProductById(id_wish_list_products) {
    return await wishListProductModel.deleteWishListProductById(
      id_wish_list_products
    );
  }

  /**
   * Eliminar por usuario y producto
   */
  async deleteByUserAndProduct(id_users, id_product_details) {
    const result = await wishListProductModel.deleteByUserAndProduct(
      id_users,
      id_product_details
    );

    if (!result) {
      throw new Error('El producto no está en tu lista de deseos');
    }

    return result;
  }

  /**
   * Obtener por ID
   */
  async getWishListProductById(id_wish_list_products) {
    return await wishListProductModel.getWishListProductById(
      id_wish_list_products
    );
  }

  /**
   * Obtener wishlist de un usuario
   */
  async getWishListByUser(id_users) {
    return await wishListProductModel.getWishListByUser(id_users);
  }

  /**
   * Obtener todas las wishlists (admin)
   */
  async getAllWishListProducts() {
    return await wishListProductModel.getAllWishListProducts();
  }

  /**
   * Verificar si un producto está en la wishlist
   */
  async isInWishList(id_users, id_product_details) {
    return await wishListProductModel.isInWishList(
      id_users,
      id_product_details
    );
  }

  /**
   * Limpiar toda la wishlist de un usuario
   */
  async clearWishList(id_users) {
    const result = await wishListProductModel.clearWishListByUser(id_users);

    if (result.length === 0) {
      throw new Error('La lista de deseos ya está vacía');
    }

    return result;
  }

  /**
   * Obtener conteo de productos en wishlist
   */
  async getWishListCount(id_users) {
    return await wishListProductModel.getWishListCount(id_users);
  }
}
