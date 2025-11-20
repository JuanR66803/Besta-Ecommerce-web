import pool from "../config/db.js"

export class ItemStateModel {


    //Metodo que me permite obtener una categoria por su Nombre
    async getItemStateByActive(is_active) {
        const query = `SELECT id_item_state FROM item_state where is_active = $1`;
        const result = await pool.query(query, [is_active]);
        return result.rows[0]
    }
}

