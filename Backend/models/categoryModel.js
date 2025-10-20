import pool from "../config/db.js";

//funcion que me permite crear una categoria
export const createCategory= async(category_name) =>{
    const query = `INSERT INTO category(category_name) VALUES($1) RETURNING *`;
    const values= [category_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite actualizar una categoria
export const updateCategoryById = async(id_category,category_name)=>{
    const query = "UPDATE category SET category_name=$2 WHERE id_category=$1";
    const values = [id_category, category_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite eliminar una categoria
export const deleteCategoryByID = async(id_category) =>{
    const query = `DELETE FROM category where id_category= $1`;
    const values= [id_category];
    const result = await pool.query(query,values);
    return result.rows[0]

}

//funcion que me permite obtener una categoria por su id
export const getCategoryByID = async(id_category) =>{
    const query = `SELECT * FROM category where id_category= $1`;
    const values= [id_category];
    const result = await pool.query(query,values);
    return result.rows[0]

}

//funcion que me permite obtener todas las categorias
export const getaAllCategories= async() =>{
    const query = `SELECT * FROM category`;
    const result = await pool.query(query);
    return result.rows[0];
}