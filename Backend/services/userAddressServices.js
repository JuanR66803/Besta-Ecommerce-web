import {UserAddressModel} from "../models/userAddressModel.js" ;

const userAddressModel = new UserAddressModel();

export class UserAddressService{
    
    //metodo para crear la coleccion de direccion del usuario
    async createUserAddress(address_name, address, city, postal_code, details){
        // se crea la coleccion de direccion del usuario sin comprobar si ya existe, hay que agregar un condicional
        return (await userAddressModel.createUserAddress(address_name, address, city, postal_code, details));
    };

    //metodo para acrualizar una coleccion de direccion del usuario
    async updateUserAddress(id_user_address, address_name, address, city, postal_code, details){
        return (await userAddressModel.updateUserAddressById(id_user_address, address_name, address, city, postal_code, details));
    };

    //metodo para eliminar la coleccion de direccion del usuario
    async deleteUserAddressById(id_user_address){
        return (await userAddressModel.deleteUserAddressById(id_user_address));
    };

    //metodo para obtener la coleccion de direccion del usuario con su id
    async getUserAddressById(id_user_address){
        return (await userAddressModel.getUserAddressById(id_user_address));
    };

    //metodo para obtener todas las colecciones de las direcciones del usuario
    async getAllUserAddresses(){
        return (await userAddressModel.getAllUserAddresses())
    };
}

