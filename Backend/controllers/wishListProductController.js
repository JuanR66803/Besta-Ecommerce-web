import { WishListProductService } from '../services/wishListProductServices.js';

const wishListProductService = new WishListProductService();

export class WishListProductController {
  /**
   * Crear/Agregar producto a wishlist
   * POST /api/wishListProduct/add
   */
  async createWishListProduct(req, res) {
    try {
      const { id_product_details, id_users } = req.body;

      if (!id_product_details || !id_users) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios',
        });
      }

      const newWishListProduct =
        await wishListProductService.createWishListProduct(
          id_product_details,
          id_users
        );

      res.status(201).json({
        success: true,
        message: 'Producto añadido a la lista de deseos',
        data: newWishListProduct,
      });
    } catch (error) {
      console.error('[Controller] Error al crear wishlist:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Error al agregar a la lista de deseos',
      });
    }
  }

  /**
   * Actualizar producto de wishlist
   * PUT /api/wishListProduct/updateWishListProductById
   */
  async updateWishListProduct(req, res) {
    try {
      const { id_wish_list_products, id_product_details, id_users } = req.body;

      if (!id_wish_list_products || !id_product_details || !id_users) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios',
        });
      }

      const updateWishListProduct =
        await wishListProductService.updateWishListProduct(
          id_wish_list_products,
          id_product_details,
          id_users
        );

      res.status(200).json({
        success: true,
        data: updateWishListProduct,
      });
    } catch (error) {
      console.error('[Controller] Error al actualizar:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la lista de deseos',
      });
    }
  }

  /**
   * Eliminar producto de wishlist por ID
   * DELETE /api/wishListProduct/deleteWishListProductById
   */
  async deleteWishListProductById(req, res) {
    try {
      const { id_wish_list_products } = req.body;

      if (!id_wish_list_products) {
        return res.status(400).json({
          success: false,
          message: 'El ID es obligatorio',
        });
      }

      const deleteWishListProduct =
        await wishListProductService.deleteWishListProductById(
          id_wish_list_products
        );

      res.status(200).json({
        success: true,
        message: 'Producto eliminado de la lista de deseos',
        data: deleteWishListProduct,
      });
    } catch (error) {
      console.error('[Controller] Error al eliminar:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar de la lista de deseos',
      });
    }
  }

  /**
   * Eliminar por usuario y producto
   * DELETE /api/wishListProduct/remove
   */
  async removeFromWishList(req, res) {
    try {
      const { id_users, id_product_details } = req.body;

      if (!id_users || !id_product_details) {
        return res.status(400).json({
          success: false,
          message: 'El ID del usuario y del producto son obligatorios',
        });
      }

      const result = await wishListProductService.deleteByUserAndProduct(
        id_users,
        id_product_details
      );

      res.status(200).json({
        success: true,
        message: 'Producto eliminado de la lista de deseos',
        data: result,
      });
    } catch (error) {
      console.error('[Controller] Error al remover:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Error al eliminar de la lista de deseos',
      });
    }
  }

  /**
   * Obtener wishlist por ID
   * GET /api/wishListProduct/getWishListProductById
   */
  async getWishListProductById(req, res) {
    try {
      const { id_wish_list_products } = req.body;

      if (!id_wish_list_products) {
        return res.status(400).json({
          success: false,
          message: 'El ID es obligatorio',
        });
      }

      const getWishListProductById =
        await wishListProductService.getWishListProductById(
          id_wish_list_products
        );

      res.status(200).json({
        success: true,
        data: getWishListProductById,
      });
    } catch (error) {
      console.error('[Controller] Error al obtener:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el producto de la lista de deseos',
      });
    }
  }

  /**
   * Obtener wishlist de un usuario
   * GET /api/wishListProduct/:userId
   */
  async getWishListByUser(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'El ID del usuario es obligatorio',
        });
      }

      const wishlist = await wishListProductService.getWishListByUser(userId);

      res.status(200).json({
        success: true,
        data: wishlist,
        count: wishlist.length,
      });
    } catch (error) {
      console.error('[Controller] Error al obtener wishlist:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de deseos',
      });
    }
  }

  /**
   * Obtener todas las wishlists (admin)
   * GET /api/wishListProduct/getAllWishListProducts
   */
  async getAllWishListProducts(req, res) {
    try {
      const getAllWishListProducts =
        await wishListProductService.getAllWishListProducts();

      res.status(200).json({
        success: true,
        data: getAllWishListProducts,
      });
    } catch (error) {
      console.error('[Controller] Error al obtener todas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las listas de deseos',
      });
    }
  }

  /**
   * Verificar si un producto está en la wishlist
   * GET /api/wishListProduct/check/:userId/:productId
   */
  async checkInWishList(req, res) {
    try {
      const { userId, productId } = req.params;

      const isInWishList = await wishListProductService.isInWishList(
        userId,
        productId
      );

      res.status(200).json({
        success: true,
        isInWishList,
      });
    } catch (error) {
      console.error('[Controller] Error al verificar:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar el producto en la lista de deseos',
      });
    }
  }

  /**
   * Limpiar toda la wishlist de un usuario
   * DELETE /api/wishListProduct/clear/:userId
   */
  async clearWishList(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'El ID del usuario es obligatorio',
        });
      }

      const result = await wishListProductService.clearWishList(userId);

      res.status(200).json({
        success: true,
        message: 'Lista de deseos limpiada exitosamente',
        deletedCount: result.length,
      });
    } catch (error) {
      console.error('[Controller] Error al limpiar:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Error al limpiar la lista de deseos',
      });
    }
  }

  /**
   * Obtener conteo de productos en wishlist
   * GET /api/wishListProduct/count/:userId
   */
  async getWishListCount(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'El ID del usuario es obligatorio',
        });
      }

      const count = await wishListProductService.getWishListCount(userId);

      res.status(200).json({
        success: true,
        count,
      });
    } catch (error) {
      console.error('[Controller] Error al obtener conteo:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el conteo de la lista de deseos',
      });
    }
  }
}
