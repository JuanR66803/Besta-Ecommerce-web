import pool from "../config/db.js"

export class ItemStateModel{

    async createItemState (item_state_name){
    const query = `INSERT INTO item_state(item_state_name) VALUES($1) RETURNING *`;
    const values= [item_state_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite actualizar una categoria
    async updateItemStateById (id_item_state,item_state_name){
    const query = "UPDATE item_state SET item_state_name=$2 WHERE id_item_state=$1";
    const values = [id_item_state, item_state_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite eliminar una categoria
    async deleteItemStateById (id_item_state){
    const query = `DELETE FROM item_state where id_item_state= $1`;
    const result = await pool.query(query,[id_item_state]);
    return result.rows[0]

}

//Metodo que me permite obtener una categoria por su id
    async getItemStateById (id_item_state){
    const query = `SELECT * FROM item_state where id_item_state= $1`;
    const result = await pool.query(query,[id_item_state]);
    return result.rows[0]
}

//Metodo que me permite obtener todas las categorias
    async getAllItemStates(){
    const query = `SELECT * FROM item_state`;
    const result = await pool.query(query);
    return result.rows[0];
}
}