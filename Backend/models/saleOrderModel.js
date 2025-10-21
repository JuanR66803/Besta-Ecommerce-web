import pool from "../config/db.js";

export class SaleOrderModel{
    
//funcion que me permite crear una orden de venta
    async createSaleOrder(id_payment_method, total_price, creation_date){
        const query = `INSERT INTO sale_order(id_payment_method, total_price, creation_date) VALUES($1,$2,$3) RETURNING *`;
        const values= [id_payment_method, total_price, creation_date];
        const result = await pool.query(query,values);
        return result.rows[0];
}

//funcion que me permite actualizar una orden de venta
    async updateSaleOrderById (id_sale_order, id_payment_method, total_price, creation_date){
    const query = "UPDATE sale_order SET id_payment_method=$2, total_price=$3, creation_date=$4 WHERE id_sale_order=$1";
    const values = [id_sale_order, id_payment_method, total_price, creation_date];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite eliminar una orden de venta
    async deleteSaleOrderById (id_sale_order){
    const query = `DELETE FROM sale_order where id_sale_order= $1`;
    const result = await pool.query(query,[id_sale_order]);
    return result.rows[0]
}

//funcion que me permite obtener una orden de venta por su id
    async getSaleOrderById (id_sale_order) {
    const query = ` SELECT 
    so.total_price,
    so.creation_date,
    pm.product_size,
    FROM sale_order so
    INNER JOIN payment_method pm ON so.id_payment_method = pm.id_payment_method
    WHERE so.id_sale_order_ = $1;
    `;
    const result = await pool.query(query,[id_sale_order]);
    return result.rows[0]
}

//funcion que me permite obtener todas las ordenes de venta
    async getAllSaleOrders(){
    const query = `SELECT 
    so.total_price,
    so.creation_date,
    pm.product_size,
    FROM sale_order so
    INNER JOIN payment_method pm ON so.id_payment_method = pm.id_payment_method`;
    const result = await pool.query(query);
    return result.rows[0];
}
}
