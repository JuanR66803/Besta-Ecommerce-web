import pool from '../config/db.js';

export class ProductDetailsModel {
  //funcion que me permite crear una sub categoria
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

  //funcion que me permite actualizar una sub categoria
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
      'UPDATE product_details SET id_product=$2, id_product_state=$3, id_color=$4, product_price=$5, stock=$6, product_size=$7, public_objetive=$8, expertise=$9 WHERE id_product_details=$1';
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

  //funcion que me permite eliminar una sub categoria
  async deleteProductDetailsById(id_product_details) {
    const query = `DELETE FROM product_details where id_product_details= $1`;
    const result = await pool.query(query, [id_product_details]);
    return result.rows[0];
  }

  //funcion que me permite obtener una sub categoria por su id
  async getProductDetailsById(id_product_details) {
    const query = `SELECT 
      pd.product_price, 
      pd.stock, 
      pd.product_size, 
      pd.id_public_objetive AS public_objetive,
      pd.id_expertice AS expertise,
      p.product_name,
      p.url_image,
      p.description,
      sc.sub_category_name,
      c.category_name
    FROM product_details pd
    INNER JOIN product p ON pd.id_product = p.id_product
    INNER JOIN sub_category sc ON p.id_sub_category = sc.id_sub_category
    INNER JOIN category c ON sc.id_category = c.id_category
    WHERE pd.id_product_details = $1`;
    const result = await pool.query(query, [id_product_details]);
    return result.rows[0];
  }

  //funcion que me permite obtener todas las categorias
  async getAllProductDetails() {
    const query = `
      SELECT 
          pd.id_product_details,
          pd.product_price, 
          pd.stock, 
          pd.product_size, 
          pd.public_objetive AS public_objetive,
          pd.expertice,
          p.product_name,
          p.description,
          sc.sub_category_name,
          c.category_name,
          ARRAY_AGG(ui.url_image) AS images
          FROM product_details pd
          INNER JOIN product p ON pd.id_product = p.id_product
          INNER JOIN sub_category sc ON p.id_sub_category = sc.id_sub_category
          INNER JOIN category c ON sc.id_category = c.id_category
          INNER JOIN product_image pi ON p.id_product = pi.id_product
          INNER JOIN url_image ui ON pi.id_url_image = ui.id_url_image
          GROUP BY 
              pd.id_product_details,
              pd.product_price, 
              pd.stock, 
              pd.product_size, 
              pd.public_objetive,
              pd.expertice,
              p.product_name,
              p.description,
              sc.sub_category_name,
              c.category_name
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  //  eMetodo Específico para el catálogo con filtros
  async getCatalogProducts(queryParams = {}) {
    try {
      const { id_category, id_sub_category, search } = queryParams;

      let query = `
        SELECT 
          pd.id_product_details,
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
        FROM product_details pd
        INNER JOIN product p ON pd.id_product = p.id_product
        INNER JOIN sub_category sc ON p.id_sub_category = sc.id_sub_category
        INNER JOIN category c ON sc.id_category = c.id_category
        LEFT JOIN product_image pi ON p.id_product = pi.id_product
        LEFT JOIN url_image ui ON pi.id_url_image = ui.id_url_image
      `;

      const conditions = [];
      const params = [];
      let paramIndex = 1;

      if (id_category) {
        conditions.push(`c.id_category = $${paramIndex}`);
        params.push(id_category);
        paramIndex++;
      }

      if (id_sub_category) {
        conditions.push(`sc.id_sub_category = $${paramIndex}`);
        params.push(id_sub_category);
        paramIndex++;
      }

      if (search) {
        const searchCondition = `(p.product_name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex} OR c.category_name ILIKE $${paramIndex} OR sc.sub_category_name ILIKE $${paramIndex})`;
        conditions.push(searchCondition);
        params.push(`%${search}%`);
        paramIndex++;
      }

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }

      query += ` 
        GROUP BY 
          pd.id_product_details,
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
        ORDER BY pd.id_product_details
      `;

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener productos del catálogo:', error);
      throw error;
    }
  }
}
