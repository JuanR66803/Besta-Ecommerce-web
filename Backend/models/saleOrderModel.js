import pool from "../config/db.js";

export class SaleOrderModel{
    
//funcion que me permite crear una sub categoria
    async createSaleOrder(id_payment_method, total_price, creation_date){
        const query = `INSERT INTO sale_order(id_payment_method, total_price, creation_date) VALUES($1,$2,$3) RETURNING *`;
        const values= [id_payment_method, total_price, creation_date];
        const result = await pool.query(query,values);
        return result.rows[0];
}

//funcion que me permite actualizar una sub categoria
    async updateSaleOrderById (id_sale_order, id_payment_method, total_price, creation_date){
    const query = "UPDATE sale_order SET id_payment_method=$2, total_price=$3, creation_date=$4 WHERE id_sale_order=$1";
    const values = [id_sale_order, id_payment_method, total_price, creation_date];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite eliminar una sub categoria
    async deleteSaleOrderById (id_sale_order){
    const query = `DELETE FROM sale_order where id_sale_order= $1`;
    const result = await pool.query(query,[id_sale_order]);
    return result.rows[0]
}

//funcion que me permite obtener una sub categoria por su id
    async getSaleOrderById (id_sale_order) {
    const query = `SELECT * FROM sale_order where id_sale_order= $1`;
    const result = await pool.query(query,[id_sale_order]);
    return result.rows[0]
}

//funcion que me permite obtener todas las categorias
    async getAllSaleOrders(){
    const query = `SELECT * FROM sale_order`;
    const result = await pool.query(query);
    return result.rows[0];
}
}
