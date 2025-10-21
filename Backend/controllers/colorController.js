import {ColorService} from "../services/colorServices.js";

const colorService = new ColorService();

export class ColorController{

    //metodo para crear un color
    async createColor(req,res){
        const {hexagecimal_code}= req.body;
        if (!hexagecimal_code ) {
        return res.status(400).json({ message: "el codigo hexagecimal es obligatorio" });
        }
        const newColor= await colorService.createColor(hexagecimal_code);
        res.status(201).json(newColor)
    };

    //metodo para actualizar un color
    async updateColor(req,res){
        const {id_color, hexagecimal_code} = req.body;
        if (!id_color || !hexagecimal_code){
            return res.status(400).json({ message: "el codigo y el id hexagecimal es obligatorio " });
        }
        const updateColor = await colorService.updateColor(id_color, hexagecimal_code)
        res.status(204).json(updateColor)
    };

    //metodo para eliminar un color
    async deleteColorById(req,res){
        const {id_color} = req.body;
        if (!id_color ){
            return res.status(400).json({ message: "el  el id hexagecimal es obligatorio " });
        }
        const deleteColor = await colorService.deleteColorById(id_color)
        res.status(204).json(deleteColor)
    };

    //metodo para obtener un color con su id
    async getColorById(req,res){
        const {id_color} = req.body;
        if (!id_color ){
            return res.status(400).json({ message: "el  el id hexagecimal es obligatorio " });
        }
        const getColorById = await colorService.getColorById(id_color)
        res.status(200).json(getColorById)
    };

    //metodo para obtener todas las categorias
    async getAllColors(req,res){
        const getAllColors = await colorService.getAllColors();
        res.status(200).json(getAllColors)
    };
}