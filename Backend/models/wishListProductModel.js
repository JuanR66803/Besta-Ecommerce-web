import pool from '../config/db.js';

export class WishListProductModel {
  /**
   * Agregar un producto a la lista de deseos
   */
  async createWishListProduct(id_product_details, id_users) {
    const query = `
      INSERT INTO wish_list_products(id_product_details, id_users) 
      VALUES($1, $2) 
      RETURNING *
    `;
    const values = [id_product_details, id_users];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Actualizar un producto de la wishlist
   */
  async updateWishListProductById(
    id_wish_list_products,
    id_product_details,
    id_users
  ) {
    const query = `
      UPDATE wish_list_products 
      SET id_product_details=$2, id_users=$3 
      WHERE id_wish_list_products=$1 
      RETURNING *
    `;
    const values = [id_wish_list_products, id_product_details, id_users];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Eliminar un producto de la wishlist
   */
  async deleteWishListProductById(id_wish_list_products) {
    const query = `
      DELETE FROM wish_list_products 
      WHERE id_wish_list_products = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [id_wish_list_products]);
    return result.rows[0];
  }

  /**
   * Eliminar por usuario y producto
   */
  async deleteByUserAndProduct(id_users, id_product_details) {
    const query = `
      DELETE FROM wish_list_products 
      WHERE id_users = $1 AND id_product_details = $2 
      RETURNING *
    `;
    const result = await pool.query(query, [id_users, id_product_details]);
    return result.rows[0];
  }

  /**
   * Obtener un producto de wishlist por ID
   */
  async getWishListProductById(id_wish_list_products) {
    const query = `
      SELECT * FROM wish_list_products 
      WHERE id_wish_list_products = $1
    `;
    const result = await pool.query(query, [id_wish_list_products]);
    return result.rows[0];
  }

  /**
   * Verificar si un producto está en la wishlist de un usuario
   */
  async isInWishList(id_users, id_product_details) {
    const query = `
      SELECT * FROM wish_list_products 
      WHERE id_users = $1 AND id_product_details = $2
    `;
    const result = await pool.query(query, [id_users, id_product_details]);
    return result.rows.length > 0;
  }

  /**
   *  Obtener toda la wishlist de un usuario con detalles completos E IMÁGENES
   */
  async getWishListByUser(id_users) {
    const query = `
      SELECT 
        wlp.id_wish_list_products,
        wlp.id_users,
        wlp.id_product_details,
        pd.product_price, 
        pd.stock, 
        pd.product_size, 
        pd.public_objetive,
        pd.expertice,
        p.id_product,
        p.product_name,
        p.description,
        sc.id_sub_category,
        sc.sub_category_name,
        c.id_category,
        c.category_name,
        ARRAY_AGG(DISTINCT ui.url_image) AS images
      FROM wish_list_products wlp
      INNER JOIN product_details pd ON wlp.id_product_details = pd.id_product_details
      INNER JOIN product p ON pd.id_product = p.id_product
      INNER JOIN sub_category sc ON p.id_sub_category = sc.id_sub_category
      INNER JOIN category c ON sc.id_category = c.id_category
      LEFT JOIN product_image pi ON p.id_product = pi.id_product
      LEFT JOIN url_image ui ON pi.id_url_image = ui.id_url_image
      WHERE wlp.id_users = $1
      GROUP BY 
        wlp.id_wish_list_products,
        wlp.id_users,
        wlp.id_product_details,
        pd.product_price, 
        pd.stock, 
        pd.product_size, 
        pd.public_objetive,
        pd.expertice,
        p.id_product,
        p.product_name,
        p.description,
        sc.id_sub_category,
        sc.sub_category_name,
        c.id_category,
        c.category_name
      ORDER BY wlp.id_wish_list_products DESC
    `;
    const result = await pool.query(query, [id_users]);
    return result.rows;
  }

  /**
   * Obtener todas las wishlists (para admin)
   */
  async getAllWishListProducts() {
    const query = `
      SELECT 
        wlp.*,
        pd.product_price,
        p.product_name,
        u.full_name as user_name,
        ARRAY_AGG(DISTINCT ui.url_image) AS images
      FROM wish_list_products wlp
      INNER JOIN product_details pd ON wlp.id_product_details = pd.id_product_details
      INNER JOIN product p ON pd.id_product = p.id_product
      INNER JOIN users u ON wlp.id_users = u.id_users
      LEFT JOIN product_image pi ON p.id_product = pi.id_product
      LEFT JOIN url_image ui ON pi.id_url_image = ui.id_url_image
      GROUP BY 
        wlp.id_wish_list_products,
        pd.product_price,
        p.product_name,
        u.full_name
      ORDER BY wlp.id_wish_list_products DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  /**
   * Limpiar toda la wishlist de un usuario
   */
  async clearWishListByUser(id_users) {
    const query = `
      DELETE FROM wish_list_products 
      WHERE id_users = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [id_users]);
    return result.rows;
  }

  /**
   * Obtener el conteo de productos en la wishlist de un usuario
   */
  async getWishListCount(id_users) {
    const query = `
      SELECT COUNT(*) as count 
      FROM wish_list_products 
      WHERE id_users = $1
    `;
    const result = await pool.query(query, [id_users]);
    return parseInt(result.rows[0].count);
  }
}
