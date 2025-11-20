import pool from "../config/db.js"

export class PaymentMethodModel{

    async createPaymentMehod (method_name){
    const query = `INSERT INTO payment_method(method_name) VALUES($1) RETURNING *`;
    const values= [method_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite actualizar una categoria
    async updatePaymentMehodById (id_payment_method,method_name){
    const query = "UPDATE payment_method SET method_name=$2 WHERE id_payment_method=$1";
    const values = [id_payment_method, method_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite eliminar una categoria
    async deletePaymentMehodById (id_payment_method){
    const query = `DELETE FROM payment_method where id_payment_method= $1`;
    const result = await pool.query(query,[id_payment_method]);
    return result.rows[0]

}

//Metodo que me permite obtener una categoria por su id
    async getPaymentMehodById (id_payment_method){
    const query = `SELECT * FROM payment_method where id_payment_method= $1`;
    const result = await pool.query(query,[id_payment_method]);
    return result.rows[0]
}

//Metodo que me permite obtener todas las categorias
    async getAllPaymentMehods(){
    const query = `SELECT * FROM payment_method`;
    const result = await pool.query(query);
    return result.rows[0];
}
}