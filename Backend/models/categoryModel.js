import pool from "../config/db.js";

export class CategoryModel{
    
    //Metodo que me permite crear una categoria
    async createCategory (category_name){
    const query = `INSERT INTO category(category_name) VALUES($1) RETURNING *`;
    const values= [category_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite actualizar una categoria
    async updateCategoryById (id_category,category_name){
    const query = "UPDATE category SET category_name=$2 WHERE id_category=$1";
    const values = [id_category, category_name];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite eliminar una categoria
    async deleteCategoryById (id_category){
    const query = `DELETE FROM category where id_category= $1`;
    const result = await pool.query(query,[id_category]);
    return result.rows[0]

}

//Metodo que me permite obtener una categoria por su id
    async getCategoryById (id_category){
    const query = `SELECT * FROM category where id_category= $1`;
    const result = await pool.query(query,[id_category]);
    return result.rows[0]

}

//Metodo que me permite obtener todas las categorias
    async getAllCategories(){
    const query = `SELECT * FROM category`;
    const result = await pool.query(query);
    return result.rows;
}
}

