import pool from "../config/db.js"

export class ColorModel{

    async createColor (hexagecimal_code){
    const query = `INSERT INTO color(hexadecimal_code) VALUES($1) RETURNING *`;
    const values= [hexagecimal_code];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite actualizar una categoria
    async updateColorById (id_color,hexagecimal_code){
    const query = "UPDATE color SET hexagecimal_code=$2 WHERE id_color=$1";
    const values = [id_color, hexagecimal_code];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite eliminar una categoria
    async deleteColorById (id_color){
    const query = `DELETE FROM color where id_color= $1`;
    const result = await pool.query(query,[id_color]);
    return result.rows[0]

}

//Metodo que me permite obtener una categoria por su id
    async getColorById (id_color){
    const query = `SELECT * FROM color where id_color= $1`;
    const result = await pool.query(query,[id_color]);
    return result.rows[0]
}

//Metodo que me permite obtener todas las categorias
    async getAllColors(){
    const query = `SELECT * FROM color`;
    const result = await pool.query(query);
    return result.rows[0];
}
}