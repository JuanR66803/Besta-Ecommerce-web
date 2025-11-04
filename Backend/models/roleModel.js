import pool from "../config/db.js";

export class RoleModel{
    

//Metodo que me permite obtener una categoria por su id
    async getRoleById (id_role){
    const query = `SELECT * FROM role where id_role= $1`;
    const result = await pool.query(query,[id_role]);
    return result.rows[0]

}

//Metodo que me permite obtener todas las categorias
    async getRoleByName(role_name){
    const query = `SELECT id_role FROM role WHERE role_name = $1`;
    const result = await pool.query(query,[role_name]);
    return result.rows[0];
}
}

