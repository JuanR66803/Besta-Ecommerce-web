import pool from "../config/db.js";

export class UserAddressModel{
    
    //Metodo que me permite crear una categoria
    async createUserAddress (address_name, address, city, postal_code, details){
    const query = `INSERT INTO user_address(address_name, address, city, postal_code, details) VALUES($1,$2,$3,$4,$5) RETURNING *`;
    const values= [address_name, address, city, postal_code, details];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite actualizar una categoria
    async updateUserAddressById (id_user_address, address_name, address, city, postal_code, details){
    const query = "UPDATE role SET address_name=$2, address=$3, city=$4, postal_code=$5, details=$5 WHERE id_user_address=$1";
    const values = [id_user_address, address_name, address, city, postal_code, details];
    const result = await pool.query(query,values);
    return result.rows[0];
}

    //Metodo que me permite eliminar una categoria
    async deleteUserAddressById (id_user_address){
    const query = `DELETE FROM role where id_user_address= $1`;
    const result = await pool.query(query,[id_user_address]);
    return result.rows[0]

}

//Metodo que me permite obtener una categoria por su id
    async getUserAddressById (id_user_address){
    const query = `SELECT * FROM role where id_user_address= $1`;
    const result = await pool.query(query,[id_user_address]);
    return result.rows[0]

}

//Metodo que me permite obtener todas las categorias
    async getAllUserAddresses(){
    const query = `SELECT * FROM role`;
    const result = await pool.query(query);
    return result.rows[0];
}
}

