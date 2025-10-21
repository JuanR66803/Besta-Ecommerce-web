import pool from "../config/db.js";

export class RoleModel{
    
    //Metodo que me permite crear una categoria
    async createRole (role_name){
    const query = `INSERT INTO role(role_name) VALUES($1) RETURNING *`;
    const values= [role_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite actualizar una categoria
    async updateRoleById (id_role,role_name){
    const query = "UPDATE role SET role_name=$2 WHERE id_role=$1";
    const values = [id_role, role_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite eliminar una categoria
    async deleteRoleById (id_role){
    const query = `DELETE FROM role where id_role= $1`;
    const result = await pool.query(query,[id_role]);
    return result.rows[0]

}

//Metodo que me permite obtener una categoria por su id
    async getRoleById (id_role){
    const query = `SELECT * FROM role where id_role= $1`;
    const result = await pool.query(query,[id_role]);
    return result.rows[0]

}

//Metodo que me permite obtener todas las categorias
    async getAllRoles(){
    const query = `SELECT * FROM role`;
    const result = await pool.query(query);
    return result.rows[0];
}
}

