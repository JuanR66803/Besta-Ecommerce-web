import {ProductStateModel} from "../models/productStateModel.js"

const productStateModel = new ProductStateModel() 

export class ProductStateService{

    //metodo para crear un estado de producto
    async createProductState(product_state_name){
        // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
        return (await productStateModel.createProductState(product_state_name));
    };

    //metodo para acrualizar un estado de producto
    async updateProductState(id_product_state,product_state_name){
        return (await productStateModel.updateProductStateById(id_product_state, product_state_name));
    };

    //metodo para eliminar un estado de producto
    async deleteProductStateById(id_product_state){
        return (await productStateModel.deleteProductStateById(id_product_state));
    };

    //metodo para obtener un estado de producto con su id
    async getProductStateById(id_product_state){
        return (await productStateModel.getProductStateById(id_product_state));
    };

    //metodo para obtener todas las categorias
    async getAllProductStates(){
        return (await productStateModel.getaAllProductStates())
    };
}