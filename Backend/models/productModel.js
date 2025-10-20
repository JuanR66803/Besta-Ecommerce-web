import pool from "../config/db.js";

export const CreateProducts = async (num_referencia, category, url_image, description) => {
        const query = `INSERT INTO producto(num_referencia,category,url_image,description) VALUES($1,$2,$3,$4) RETURNING *`;
        const values = [num_referencia, category, url_image, description];
        const result = await pool.query(query, values);
        return result.rows[0];
}
export const findProducts = async () => {
        const query = "select * from producto p inner join detalle_producto d on p.id_producto = d.id_producto;"
        const result = await pool.query(query);
        return result.rows;
};


export const UpdateProductsId = async (id_producto, num_referencia, category, url_image, description) => {
        const query = "UPDATE producto SET num_referencia=$2,category=$3,url_image=$4,description=$5 WHERE id_producto=$1";
        const values = [id_producto, num_referencia, category, url_image, description];
        const result = await pool.query(query, values);
        return result.rows[0]
};

//Funcion para encontrar un producto especifico mediante su id
export const findProductById = async (id_producto) => {
        const query ='SELECT * FROM producto p INNER JOIN detalle_producto d ON p.id_producto = d.id_producto WHERE p.id_producto = $1';
        const result = await pool.query(query, [id_producto]);
        return result.rows[0];
}


// Funcion para eliminar un producto
export const deleteProducts = async (id_producto) => {
        const queryDetail = "DELETE FROM detalle_producto WHERE id_producto = $1";
        await pool.query(queryDetail, [id_producto]);

        const query = "DELETE FROM producto WHERE id_producto = $1 RETURNING *";
        const result = await pool.query(query, [id_producto])
        return result.rows[0]; 
}





