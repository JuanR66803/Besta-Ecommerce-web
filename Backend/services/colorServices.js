import {ColorModel} from "../models/colorModel.js"

const colorModel = new ColorModel() 

export class ColorService{

    //metodo para crear un color
    async createColor(hexagecimal_code){
        // se crea el color sin comprobar si ya existe, hay que agregar un condicional
        return (await colorModel.createColor(hexagecimal_code));
    };

    //metodo para acrualizar un color
    async updateColor(id_color,hexagecimal_code){
        return (await colorModel.updateColorById(id_color, hexagecimal_code));
    };

    //metodo para eliminar un color
    async deleteColorById(id_color){
        return (await colorModel.deleteColorById(id_color));
    };

    //metodo para obtener un color con su id
    async getColorById(id_color){
        return (await colorModel.getColorById(id_color));
    };

    //metodo para obtener todos los colores
    async getAllColors(){
        return (await colorModel.getAllColors())
    };
}