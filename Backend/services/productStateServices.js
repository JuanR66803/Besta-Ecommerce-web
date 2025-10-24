import {ProductStateModel} from "../models/productStateModel.js"

const productStateModel = new ProductStateModel() 

export class ProductStateService{


    //metodo para obtener un estado de producto con su id
    async getProductStateById(id_product_state){
        return (await productStateModel.getProductStateById(id_product_state));
    };

    //metodo para obtener todas las categorias
    async getProductStateByName(state_name){
        return (await productStateModel.getProductStateByName(state_name))
    };
}