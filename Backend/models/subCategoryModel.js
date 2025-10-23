import pool from "../config/db.js";

export class SubCategoryModel {

    //funcion que me permite crear una sub categoria
    async createSubCategory(id_category, sub_category_name) {
        const query = `INSERT INTO sub_category(id_category, sub_category_name) VALUES($1,$2) RETURNING *`;
        const values = [id_category, sub_category_name];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    //funcion que me permite actualizar una sub categoria
    async updateSubCategoryById(id_sub_category, id_category, sub_category_name) {
        const query = "UPDATE sub_category SET id_category_=$2, sub_category_name=$3 WHERE id_sub_category=$1";
        const values = [id_sub_category, id_category, sub_category_name];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    //funcion que me permite eliminar una sub categoria
    async deleteSubCategoryById(id_sub_category) {
        const query = `DELETE FROM sub_category where id_sub_category= $1`;
        const result = await pool.query(query, [id_sub_category]);
        return result.rows[0]
    }

    //funcion que me permite obtener una sub categoria por su id
    async getSubCategoryById(id_sub_category) {
        const query = `SELECT * FROM sub_category where id_sub_category= $1`;
        const result = await pool.query(query, [id_sub_category]);
        return result.rows[0]
    }

    //funcion que me permite obtener todas las categorias
    async getAllSubCategories() {
        const query = `SELECT * FROM sub_category`;
        const result = await pool.query(query);
        return result.rows[0];
    }
    async getSubacategoriesByName(name){
        const query =`SELECT id_sub_category FROM sub_category WHERE sub_category_name = $1`
        const result = await pool.query(query,[name]);
        return result.rows[0];
    }

}
