import {GenderModel} from "../models/genderModel.js" ;

const genderModel = new GenderModel();

export class GenderService{
    
    async getGenderById(id_role){
        return (await genderModel.getGenderById(id_role));
    };

    //metodo para obtener todas las categorias
    async getGenderByName(gender_name){
        return (await genderModel.getGenderByName(gender_name))
    };
}

