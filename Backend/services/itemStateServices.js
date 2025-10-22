import {ItemStateModel} from "../models/itemStateModel.js"

const itemStateModel = new ItemStateModel() 

export class ItemStateService{

    //metodo para crear un itemState
    async createItemState(item_state_name){
        // se crea el itemState sin comprobar si ya existe, hay que agregar un condicional
        return (await itemStateModel.createItemState(item_state_name));
    };

    //metodo para acrualizar un itemState
    async updateItemState(id_item_state,item_state_name){
        return (await itemStateModel.updateItemStateById(id_item_state, item_state_name));
    };

    //metodo para eliminar un itemState
    async deleteItemStateById(id_item_state){
        return (await itemStateModel.deleteItemStateById(id_item_state));
    };

    //metodo para obtener un itemState con su id
    async getItemStateById(id_item_state){
        return (await itemStateModel.getItemStateById(id_item_state));
    };

    //metodo para obtener todos los itemStatees
    async getAllItemStates(){
        return (await itemStateModel.getAllItemStates())
    };
}