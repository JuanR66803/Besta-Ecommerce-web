import pool from "../config/db.js";

export class ProductModel{

    //funcion que me permite crear un producto
    async createProduct(id_sub_category, product_name, url_image, description){
        const query = `INSERT INTO product(id_sub_category, product_name, url_image, description) VALUES($1,$2,$3,$4) RETURNING *`;
        const values= [id_sub_category, product_name, url_image, description];
        const result = await pool.query(query,values);
        return result.rows[0];
}

//funcion que me permite actualizar un producto
    async updateProductById (id_product, id_sub_category, product_name, url_image, description){
        const query = "UPDATE sub_category SET id_sub_category =$2, product_name =$3, url_image =$4, description =$5 WHERE id_product=$1";
        const values = [id_product, id_sub_category, product_name, url_image, description];
        const result = await pool.query(query,values);
        return result.rows[0];
}

//funcion que me permite eliminar un producto
    async deleteProductById(id_product) {
        const query = `DELETE FROM product where id_product= $1`;
        const result = await pool.query(query,[id_product]);
        return result.rows[0]

}

//funcion que me permite obtener un producto por su id
    async getProductById (id_product){
        const query = `SELECT * FROM category where id_product= $1`;
        const result = await pool.query(query,[id_product]);
        return result.rows[0]

}

//funcion que me permite obtener todos los productos
async  getAllProducts(queryParams) {
  const { id_category, id_sub_category } = queryParams;

  let query = `
    SELECT 
      pd.id_product_details AS id,
      p.id_product AS product_id,
      p.product_name AS name,
      p.description,
      p.url_image,
      pd.product_price AS price,
      pd.stock AS total_stock,
      pd.product_size AS size,
      c.id_category AS category_id,
      c.category_name AS category_name,
      sc.id_sub_category AS subcategory_id,
      sc.sub_category_name AS subcategory_name,
      col.hexadecimal_code AS color
    FROM product_details pd
    INNER JOIN product p ON pd.id_product = p.id_product
    INNER JOIN sub_category sc ON p.id_sub_category = sc.id_sub_category
    INNER JOIN category c ON sc.id_category = c.id_category
    INNER JOIN color col ON pd.id_color = col.id_color
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

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
}

}
