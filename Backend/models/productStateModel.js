import pool from "../config/db.js"

export class ProductStateModel{

    
//Metodo que me permite obtener una categoria por su id
    async getProductStateById (id_product_state){
    const query = `SELECT * FROM product_state where id_product_state= $1`;
    const result = await pool.query(query,[id_product_state]);
    return result.rows[0]
}

//Metodo que me permite obtener todas las categorias
    async getProductStateByName(state_name){
    const query = `SELECT id_state_product FROM product_state WHERE product_state_name = $!`;
    const result = await pool.query(query,[state_name]);
    return result.rows[0];
}
}