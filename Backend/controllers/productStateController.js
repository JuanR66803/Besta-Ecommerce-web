import {ProductStateService} from "../services/productStateServices.js";

const productStateService = new ProductStateService();

export class ProductStateController{

    //metodo para crear un estado de producto
    async createProductState(req,res){
        const {product_state_name}= req.body;
        if (!product_state_name ) {
        return res.status(400).json({ message: "el nombre del estado de producto es obligatoria" });
        }
        const newProductState= await productStateService.createProductState(product_state_name);
        res.status(201).json(newProductState)
    };

    //metodo para actualizar un estado de producto
    async updateProductState(req,res){
        const {id_product_state, product_state_name} = req.body;
        if (!id_product_state || !product_state_name){
            return res.status(400).json({ message: "el nombre y el id del estado de producto es obligatoria " });
        }
        const updateProductState = await productStateService.updateProductState(id_product_state, product_state_name)
        res.status(204).json(updateProductState)
    };

    //metodo para eliminar un estado de producto
    async deleteProductStateById(req,res){
        const {id_product_state} = req.body;
        if (!id_product_state ){
            return res.status(400).json({ message: "el  el id del estado de producto es obligatoria " });
        }
        const deleteProductState = await productStateService.deleteProductStateById(id_product_state)
        res.status(204).json(deleteProductState)
    };

    //metodo para obtener un estado de producto con su id
    async getProductStateById(req,res){
        const {id_product_state} = req.body;
        if (!id_product_state ){
            return res.status(400).json({ message: "el  el id del estado de producto es obligatoria " });
        }
        const getProductStateById = await productStateService.getProductStateById(id_product_state)
        res.status(200).json(getProductStateByIdProductState)
    };

    //metodo para obtener todas las categorias
    async getAllProductStates(req,res){
        const getAllProductStates = await productStateService.getAllProductStates();
        res.status(200).json(getAllProductStates)
    };
}