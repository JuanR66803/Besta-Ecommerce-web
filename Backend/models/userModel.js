import pool from "../config/db.js";


export class UserModel{
    //funcion que me permite crear un usuario
    async createUser(fullname, email, password, birthDate, phone){
        const query = `INSERT INTO users(fullname, email, password, birth_date, phone) VALUES($1,$2,$3,$4,$5) RETURNING *`;
        const values= [fullname, email, password, birthDate, phone];
        const result = await pool.query(query,values);
        return result.rows[0];
    }
    async getUserByEmail(email){
        const query = `SELECT * FROM users WHERE email=$1`;
        const result = await pool.query(query,[email]);
        return result.rows[0];
    }
    
}