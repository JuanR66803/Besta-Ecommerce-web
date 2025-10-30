import {ItemStateModel} from "../models/itemStateModel.js"

const itemStateModel = new ItemStateModel() 

export class ItemStateService{

    //metodo para obtener un itemState con su id
    async getItemStateByActive(is_active){
        return (await itemStateModel.getItemStateByActive(is_active));
    };
}