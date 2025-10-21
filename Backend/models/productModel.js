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
    async getAllProducts(){
        const query = `SELECT * FROM product`;
        const result = await pool.query(query);
        return result.rows[0];
}
}
