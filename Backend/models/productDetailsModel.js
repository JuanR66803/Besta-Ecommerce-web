import pool from "../config/db.js";

export class ProductDetailsModel {
  //funcion que me permite crear una sub categoria
  async createProductDetails(id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertice ) {
    const query = `INSERT INTO product_details(id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertice) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
    const values = [id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertice,];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  //funcion que me permite actualizar una sub categoria
  async updateProductDetailsById(id_product_details, id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise) {
    const query =
      "UPDATE product_details SET id_product=$2, id_product_state=$3, id_color=$4, product_price=$5, stock=$6, product_size=$7, public_objetive=$8, expertise=$9 WHERE id_product_details=$1";
    const values = [id_product_details, id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise];
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
}
