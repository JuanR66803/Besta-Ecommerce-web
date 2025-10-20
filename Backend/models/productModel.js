import pool from "../config/db.js";

//funcion que me permite crear un producto
export const createProduct= async(id_sub_category, product_name, url_image, description) =>{
    const query = `INSERT INTO product(id_sub_category, product_name, url_image, description) VALUES($1,$2,$3,$4) RETURNING *`;
    const values= [id_sub_category, product_name, url_image, description];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite actualizar un producto
export const updateProductById = async(id_product, id_sub_category, product_name, url_image, description)=>{
    const query = "UPDATE sub_category SET id_sub_category =$2, product_name =$3, url_image =$4, description =$5 WHERE id_product=$1";
    const values = [id_product, id_sub_category, product_name, url_image, description];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite eliminar un producto
export const deleteProductByID = async(id_product) =>{
    const query = `DELETE FROM product where id_product= $1`;
    const values= [id_product];
    const result = await pool.query(query,values);
    return result.rows[0]

}

//funcion que me permite obtener un producto por su id
export const getProductByID = async(id_product) =>{
    const query = `SELECT * FROM category where id_product= $1`;
    const values= [id_product];
    const result = await pool.query(query,values);
    return result.rows[0]

}

//funcion que me permite obtener todos los productos
export const getaAllProducts= async() =>{
    const query = `SELECT * FROM product`;
    const result = await pool.query(query);
    return result.rows[0];
}