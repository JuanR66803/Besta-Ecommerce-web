import pool from "../config/db.js";


export class UserModel{
    //funcion que me permite crear un usuario
    async createUser(full_name, email, user_password,id_user_address, phone_number,id_gender, birth_date,id_role,register_date){
        const query = `INSERT INTO users(full_name, email, user_password,id_user_address, phone_number,id_gender, birth_date,id_role,register_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
        const values= [full_name, email, user_password,id_user_address, phone_number,id_gender, birth_date,id_role];
        const result = await pool.query(query,values);
        return result.rows[0];
    }
    async getUserByEmail(email){
        const query = `SELECT * FROM users WHERE email=$1`;
        const result = await pool.query(query,[email]);
        return result.rows[0];
    }
    
}