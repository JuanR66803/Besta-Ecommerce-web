import {GenderModel} from "../models/roleModel.js" ;

const roleModel = new GenderModel();

export class GenderService{
    
    //metodo para crear una categoria
    async createGender(role_name){
        // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
        return (await roleModel.createGender(role_name));
    };

    //metodo para acrualizar una categoria
    async updateGender(id_role,role_name){
        return (await roleModel.updateGenderById(id_role, role_name));
    };

    //metodo para eliminar una categoria
    async deleteGenderById(id_role){
        return (await roleModel.deleteGenderById(id_role));
    };

    //metodo para obtener una categoria con su id
    async getGenderById(id_role){
        return (await roleModel.getGenderById(id_role));
    };

    //metodo para obtener todas las categorias
    async getAllGenders(){
        return (await roleModel.getAllGenders())
    };
}

