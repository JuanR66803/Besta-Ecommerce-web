import { ProductDetailsService } from "../services/productDetailsServices.js";

    const productDetailsService = new ProductDetailsService();

export class ProductDetailsController{

    //metodo para crear una sub categoria
    async createProductDetails(req,res){
        const {id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise}= req.body;
        if (!id_product || !id_product_state || !id_color || !product_price || !stock || !product_size || !public_objetive || !expertise ) {
        return res.status(400).json({ message: "todos los campos son obligatorios" });
        }
        const newProductDetails= await productDetailsService.createProductDetails(id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise);
        res.status(201).json(newProductDetails)
    };

    //metodo para actualizar una sub categoria
    async updateProductDetails(req,res){
        const {id_product_details, id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise} = req.body;
        if (!id_product_details || !id_product || !id_product_state || !id_color || !product_price || !stock || !product_size || !public_objetive || !expertise){
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const updateProductDetails = await productDetailsService.updateProductDetails(id_product_details, id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise)
        res.status(204).json(updateProductDetails)
    };

    //metodo para eliminar una sub categoria
    async deleteProductDetailsById(req,res){
        const {id_product_details} = req.body;
        if (!id_product_details ){
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const deleteProductDetails = await productDetailsService.deleteProductDetailsById(id_product_details)
        res.status(204).json(deleteProductDetails)
    };

    //metodo para obtener una sub categoria con su id
    async getProductDetailsById(req,res){
        const {id_product_details} = req.body;
        if (!id_product_details ){
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const getProductDetailsById = await productDetailsService.getProductDetailsById(id_product_details)
        res.status(200).json(getProductDetailsById)
    };

    //metodo para obtener todas las sub categorias
    async getAllProductDetails(req,res){
        const getAllProductDetails = await productDetailsService.getAllProductDetails();
        res.status(200).json(getAllProductDetails)
    };
}