import pool from "../config/db.js";

export class WishListProductModel{
    
//funcion que me permite crear una sub categoria
    async createWishListProduct(id_product_details, id_users){
        const query = `INSERT INTO wish_list_product(id_product_details, id_users) VALUES($1,$2) RETURNING *`;
        const values= [id_product_details, id_users];
        const result = await pool.query(query,values);
        return result.rows[0];
}

//funcion que me permite actualizar una sub categoria
    async updateWishListProductById (id_wish_list_product, id_product_details, id_users){
    const query = "UPDATE wish_list_product SET id_product_details=$2, id_users=$3 WHERE id_wish_list_product=$1";
    const values = [id_wish_list_product, id_product_details, id_users];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite eliminar una sub categoria
    async deleteWishListProductById (id_wish_list_product){
    const query = `DELETE FROM wish_list_product where id_wish_list_product= $1`;
    const result = await pool.query(query,[id_wish_list_product]);
    return result.rows[0]
}

//funcion que me permite obtener una sub categoria por su id
    async getWishListProductById (id_wish_list_product) {
    const query = `SELECT * FROM wish_list_product where id_wish_list_product= $1`;
    const result = await pool.query(query,[id_wish_list_product]);
    return result.rows[0]
}

//funcion que me permite obtener todas las categorias
    async getAllWishListProducts(){
    const query = `SELECT * FROM wish_list_product`;
    const result = await pool.query(query);
    return result.rows[0];
}
}
