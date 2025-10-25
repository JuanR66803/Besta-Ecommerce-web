import pool from '../config/db.js';

export class ProductDetailsModel {
  async getAllProductDetails(filters = {}) {
    try {
      console.log(
        '[ProductDetailsModel] Construyendo query con filtros:',
        filters
      );

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
      let paramCount = 1;

      if (filters.id_category) {
        query += ` AND c.id_category = $${paramCount}`;
        params.push(filters.id_category);
        paramCount++;
      }

      if (filters.id_sub_category) {
        query += ` AND sc.id_sub_category = $${paramCount}`;
        params.push(filters.id_sub_category);
        paramCount++;
      }

      query += ` ORDER BY p.id_product DESC, pd.product_size`;

      console.log('[ProductDetailsModel] Query:', query);
      console.log('[ProductDetailsModel] Params:', params);

      const result = await pool.query(query, params);

      console.log(
        `[ProductDetailsModel] ${result.rows.length} filas encontradas`
      );

      return result.rows;
    } catch (error) {
      console.error('[ERROR] ProductDetailsModel.getAllProductDetails:', error);
      throw error;
    }
  }

  async getProductDetailById(id_product) {
    try {
      const query = `
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
                WHERE pd.id_product = $1
                ORDER BY pd.product_size;
            `;

      const result = await pool.query(query, [id_product]);
      return result.rows;
    } catch (error) {
      console.error('[ERROR] ProductDetailsModel.getProductDetailById:', error);
      throw error;
    }
  }

  async createProductDetails(
    id_product,
    id_product_state,
    id_color,
    product_price,
    stock,
    product_size,
    public_objetive,
    expertice
  ) {
    const query = `INSERT INTO product_details(id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertice) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
    const values = [
      id_product,
      id_product_state,
      id_color,
      product_price,
      stock,
      product_size,
      public_objetive,
      expertice,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateProductDetailsById(
    id_product_details,
    id_product,
    id_product_state,
    id_color,
    product_price,
    stock,
    product_size,
    public_objetive,
    expertise
  ) {
    const query =
      'UPDATE product_details SET id_product=$2, id_product_state=$3, id_color=$4, product_price=$5, stock=$6, product_size=$7, public_objetive=$8, expertice=$9 WHERE id_product_details=$1';
    const values = [
      id_product_details,
      id_product,
      id_product_state,
      id_color,
      product_price,
      stock,
      product_size,
      public_objetive,
      expertise,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteProductDetailsById(id_product_details) {
    const query = `DELETE FROM product_details where id_product_details= $1`;
    const result = await pool.query(query, [id_product_details]);
    return result.rows[0];
  }

  async getProductDetailsById(id_product_details) {
    const query = `
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
            WHERE pd.id_product_details = $1`;
    const result = await pool.query(query, [id_product_details]);
    return result.rows[0];
  }
}
