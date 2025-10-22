import pool from "../config/db.js";

export class GenderModel{
    
    async getGenderByName(gender_name){
        const query = `SELECT id_gender FROM gender WHERE gender_name = $1`
        const result = await pool.query(query,[gender_name])
        return result.rows[0]
   }


//Metodo que me permite obtener una categoria por su id
    async getGenderById (id_gender){
        const query = `SELECT * FROM gender where id_gender= $1`;
        const result = await pool.query(query,[id_gender]);
        return result.rows[0]

}


}

