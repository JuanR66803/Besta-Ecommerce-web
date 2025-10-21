import pool from "../config/db.js";


export class UserModel{
    //funcion que me permite crear un usuario
    async createUser(full_name, email, password, birthDate, phone_number){
        const query = `INSERT INTO users(fullname, email, password, birth_date, phone) VALUES($1,$2,$3,$4,$5) RETURNING *`;
        const values= [full_name, email, password, birthDate, phone_number];
        const result = await pool.query(query,values);
        return result.rows[0];
    }
    async getUserByEmail(email){
        const query = `SELECT * FROM users WHERE email=$1`;
        const result = await pool.query(query,[email]);
        return result.rows[0];
    }
    
}