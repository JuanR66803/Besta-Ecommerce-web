import pool from '../config/db.js';

export class ProductDetailsModel {
  async getAllProductDetails(filters = {}) {

    let query = `
        SELECT
            pd.id_product_details,
            pd.id_product,
            pd.product_price,
            pd.stock,
            pd.product_size,
            pd.public_objetive,
            pd.expertice,
            p.product_name,
            p.url_image,
            p.description,
            p.id_sub_category,
            sc.sub_category_name,
            sc.id_category,
            c.category_name,
            col.hexadecimal_code as colors
        FROM product_details pd
        INNER JOIN product p ON pd.id_product = p.id_product
        INNER JOIN sub_category sc ON p.id_sub_category = sc.id_sub_category
        INNER JOIN category c ON sc.id_category = c.id_category
        LEFT JOIN color col ON pd.id_color = col.id_color
        WHERE 1=1
    `;

    const params = [];
    let paramIndex = 1;

    if (filters.id_category) {
      query += ` AND c.id_category = $${paramIndex++}`;
      params.push(filters.id_category);
    }

    if (filters.id_sub_category) {
      query += ` AND sc.id_sub_category = $${paramIndex++}`;
      params.push(filters.id_sub_category);
    }

    query += ' ORDER BY p.id_product DESC, pd.product_size';

    try {
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

}