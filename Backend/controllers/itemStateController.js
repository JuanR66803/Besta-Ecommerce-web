import {ItemStateService} from "../services/itemStateServices.js";

const itemStateService = new ItemStateService();

export class ItemStateController{

    //metodo para crear un item_state
    async createItemState(req,res){
        const {item_state_name}= req.body;
        if (!item_state_name ) {
        return res.status(400).json({ message: "todos los campos son obligatorios" });
        }
        const newItemState= await itemStateService.createItemState(item_state_name);
        res.status(201).json(newItemState)
    };

    //metodo para actualizar un item_state
    async updateItemState(req,res){
        const {id_item_state, item_state_name} = req.body;
        if (!id_item_state || !item_state_name){
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const updateItemState = await itemStateService.updateItemState(id_item_state, item_state_name)
        res.status(204).json(updateItemState)
    };

    //metodo para eliminar un item_state
    async deleteItemStateById(req,res){
        const {id_item_state} = req.body;
        if (!id_item_state ){
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const deleteItemState = await itemStateService.deleteItemStateById(id_item_state)
        res.status(204).json(deleteItemState)
    };

    //metodo para obtener un item_state con su id
    async getItemStateById(req,res){
        const {id_item_state} = req.body;
        if (!id_item_state ){
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const getItemStateById = await itemStateService.getItemStateById(id_item_state)
        res.status(200).json(getItemStateById)
    };

    //metodo para obtener todas las categorias
    async getAllItemStates(req,res){
        const getAllItemStates = await itemStateService.getAllItemStates();
        res.status(200).json(getAllItemStates)
    };
}