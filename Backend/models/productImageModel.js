import pool from "../config/db.js";

export class ProductImageModel {
    //funcion que me permite crear una imagen de producto
    async createProductImage(id_product, id_url_image) {
        const query = `INSERT INTO product_image(id_product, id_url_image) VALUES($1,$2) RETURNING *`;
        const values= [id_product, id_url_image];
        const result = await pool.query(query,values);
        return result.rows[0];
    };
    async createImageUrl(url_image) {
        try {
            const query = `INSERT INTO url_image(url_image) VALUES($1) RETURNING *`;
            const values = [url_image];
            const result = await pool.query(query, values);
            if (result.rows.length === 0) {
                throw new Error("No se pudo insertar la URL de la imagen en la base de datos");
            }
            return result.rows[0];
        } catch (error) {
            console.error("Error en createImageUrl:", error);
            throw error;
        }
    };
    async updateProductImageById (id_product_image, id_product, id_url_image){
        const query = "UPDATE product_image SET id_product =$2, id_url_image =$3 WHERE id_product_image=$1";
        const values = [id_product_image, id_product, id_url_image];
        const result = await pool.query(query,values);
        return result.rows[0]; 
    };
    async updateImageUrlById (id_url_image, url_image){
        const query = "UPDATE url_image SET url_image =$2 WHERE id_url_image=$1";
        const values = [id_url_image, url_image];
        const result = await pool.query(query,values);
        return result.rows[0]; 
    };
}