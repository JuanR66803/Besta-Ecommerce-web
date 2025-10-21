import pool from "../config/db.js";

export class SaleOrderItemModel{
    
//funcion que me permite crear un item de la orden de venta
    async createSaleOrderItem(id_product_details, id_sale_order, product_price, partial_price, quantity){
        const query = `INSERT INTO sale_order(id_product_details, id_sale_order, product_price, partial_price, quantity) VALUES($1,$2,$3,$4,$5) RETURNING *`;
        const values= [id_product_details, id_sale_order, product_price, partial_price, quantity];
        const result = await pool.query(query,values);
        return result.rows[0];
}

//funcion que me permite actualizar un item de la orden de venta
    async updateSaleOrderItemById (id_sale_order_item, id_product_details, id_sale_order, product_price, partial_price, quantity){
    const query = "UPDATE sale_order_item SET id_product_details=$2, id_sale_order=$3, product_price=$4, partial_price=$5, quantity=$6 WHERE id_sale_order_item=$1";
    const values = [id_sale_order_item, id_product_details, id_sale_order, product_price, partial_price, quantity];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite eliminar un item de la orden de venta
    async deleteSaleOrderItemById (id_sale_order_item){
    const query = `DELETE FROM sale_order_item where id_sale_order_item= $1`;
    const result = await pool.query(query,[id_sale_order_item]);
    return result.rows[0]
}

//funcion que me permite obtener un item de la orden de venta por su id
    async getSaleOrderItemById (id_sale_order_item) {
    const query = ` SELECT 
    soi.id_sale_order_item,
    soi.product_price,
    soi.partial_price,
    soi.quantity,
    soi.id_sale_order,

    pd.product_size,

    p.product_name,
    p.url_image
    FROM sale_order_item soi
    INNER JOIN product_details pd ON soi.id_product_details = pd.id_product_details
    INNER JOIN product p ON pd.id_product = p.id_product
    WHERE soi.id_sale_order_item = $1;
    `;
    const result = await pool.query(query,[id_sale_order_item]);
    return result.rows[0]
}

//funcion que me permite obtener todos los items de las ordenes de venta
    async getAllSaleOrderItems(){
    const query = `SELECT 
    soi.id_sale_order_item,
    soi.product_price,
    soi.partial_price,
    soi.quantity,
    soi.id_sale_order,

    pd.product_size,

    p.product_name,
    p.url_image
    FROM sale_order_item soi
    INNER JOIN product_details pd ON soi.id_product_details = pd.id_product_details
    INNER JOIN product p ON pd.id_product = p.id_product`;
    const result = await pool.query(query);
    return result.rows[0];
}
}
