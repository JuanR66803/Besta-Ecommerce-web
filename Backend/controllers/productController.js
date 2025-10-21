import { ProductService } from "../services/productServices";

    const productService = new ProductService();

export class ProductController{

    //metodo para crear una categoria
    async createProduct(req,res){
        const {id_sub_category, product_name, url_image, description}= req.body;
        if (!id_sub_category || !product_name || !url_image || !description) {
        return res.status(400).json({ message: "todos los campos deben ser obligatorios" });
        }
        const newProduct= await productService.createProduct(id_sub_category, product_name, url_image, description);
        res.status(201).json(newProduct)
    };

    //metodo para actualizar una categoria
    async updateProduct(req,res){
        const {id_product, id_sub_category, product_name, url_image, description} = req.body;
        if (!id_product || id_sub_category || product_name || url_image || description){
            return res.status(400).json({ message: "todos los campos deben ser obligatorios" });
        }
        const updateProduct = await productService.updateProduct(id_product, id_sub_category, product_name, url_image, description)
        res.status(204).json(updateProduct)
    };

    //metodo para eliminar una categoria
    async deleteProductById(req,res){
        const {id_category} = req.body;
        if (!id_category ){
            return res.status(400).json({ message: "el  el id de la categoria es obligatoria " });
        }
        const deleteProduct = await productService.deleteProductById(id_category)
        res.status(204).json(deleteProduct)
    };

    //metodo para obtener una categoria con su id
    async getProductById(req,res){
        const {id_category} = req.body;
        if (!id_category ){
            return res.status(400).json({ message: "el  el id de la categoria es obligatoria " });
        }
        const getProductById = await productService.getProductById(id_category)
        res.status(200).json(getProductByIdProduct)
    };

    //metodo para obtener todas las categorias
    async getAllProducts(req,res){
        const getAllProducts = await productService.getAllProducts();
        res.status(200).json(getAllProducts)
    };
}