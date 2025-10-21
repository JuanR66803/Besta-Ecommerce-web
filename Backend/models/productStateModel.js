import pool from "../config/db.js"

export class ProductStateModel{

    async createProductState (product_state_name){
    const query = `INSERT INTO product_state(product_state_name) VALUES($1) RETURNING *`;
    const values= [product_state_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite actualizar una categoria
    async updateProductStateById (id_product_state,product_state_name){
    const query = "UPDATE product_state SET product_state_name=$2 WHERE id_product_state=$1";
    const values = [id_product_state, product_state_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite eliminar una categoria
    async deleteProductStateById (id_product_state){
    const query = `DELETE FROM product_state where id_product_state= $1`;
    const result = await pool.query(query,[id_product_state]);
    return result.rows[0]

}

//Metodo que me permite obtener una categoria por su id
    async getProductStateById (id_product_state){
    const query = `SELECT * FROM product_state where id_product_state= $1`;
    const result = await pool.query(query,[id_product_state]);
    return result.rows[0]
}

//Metodo que me permite obtener todas las categorias
    async getaAllProductStates(){
    const query = `SELECT * FROM product_state`;
    const result = await pool.query(query);
    return result.rows[0];
}
}