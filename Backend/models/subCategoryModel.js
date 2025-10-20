import pool from "../config/db.js";

//funcion que me permite crear una sub categoria
export const createSubCategory= async(id_category, sub_category_name) =>{
    const query = `INSERT INTO sub_category(id_category, sub_category_name) VALUES($1,$2) RETURNING *`;
    const values= [id_category , sub_category_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite actualizar una sub categoria
export const updateSubCategoryById = async(id_sub_category, id_category, sub_category_name)=>{
    const query = "UPDATE sub_category SET id_category_=$2, sub_category_name=$3 WHERE id_sub_category=$1";
    const values = [id_sub_category, id_category, sub_category_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

//funcion que me permite eliminar una sub categoria
export const deleteSubCategoryByID = async(id_sub_category) =>{
    const query = `DELETE FROM sub_category where id_sub_category= $1`;
    const values= [id_sub_category];
    const result = await pool.query(query,values);
    return result.rows[0]

}

//funcion que me permite obtener una sub categoria por su id
export const getSubCategoryByID = async(id_sub_category) =>{
    const query = `SELECT * FROM sub_category where id_sub_category= $1`;
    const values= [id_sub_category];
    const result = await pool.query(query,values);
    return result.rows[0]

}

//funcion que me permite obtener todas las categorias
export const getaAllSubCategories= async() =>{
    const query = `SELECT * FROM sub_category`;
    const result = await pool.query(query);
    return result.rows[0];
}