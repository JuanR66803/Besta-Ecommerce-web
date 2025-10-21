import pool from "../config/db.js";

export class GenderModel{
    
    //Metodo que me permite crear una categoria
    async createGender (gender_name){
    const query = `INSERT INTO gender(gender_name) VALUES($1) RETURNING *`;
    const values= [gender_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite actualizar una categoria
    async updateGenderById (id_gender,gender_name){
    const query = "UPDATE gender SET gender_name=$2 WHERE id_gender=$1";
    const values = [id_gender, gender_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite eliminar una categoria
    async deleteGenderById (id_gender){
    const query = `DELETE FROM gender where id_gender= $1`;
    const result = await pool.query(query,[id_gender]);
    return result.rows[0]

}

//Metodo que me permite obtener una categoria por su id
    async getGenderById (id_gender){
    const query = `SELECT * FROM gender where id_gender= $1`;
    const result = await pool.query(query,[id_gender]);
    return result.rows[0]

}

//Metodo que me permite obtener todas las categorias
    async getAllGenders(){
    const query = `SELECT * FROM gender`;
    const result = await pool.query(query);
    return result.rows[0];
}
}

