import pool from "../config/db.js";

export const createDetailsProduct = async(id_producto,name,subcategory,type,color,size_min,size_max,material) =>{
    const query = `INSERT INTO detalle_producto(id_producto,name,subcategory,type,color,size_min,size_max,material) VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;
    const values = [id_producto,name,subcategory,type,color,size_min,size_max,material];
    const result = await pool.query(query,values);
    return result.rows[0];
}

export const UpdateDetailsProduct = async(id_detalle,name,subcategory,type,color,size_min,size_max,material)=>{
    const query = `UPDATE detalle_producto SET name=$2 ,subcategory=$3, type=$4,color=$5,size_min=$6,size_max=$7,material=$8 WHERE id_detalle=$1`;
    const values = [id_detalle,name,subcategory,type,color,size_min,size_max,material];
    const result = await pool.query(query,values);
    return result.rows[0];
};