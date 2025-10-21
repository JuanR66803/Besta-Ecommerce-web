import { WishListProductService } from "../services/wishListProductServices.js";

    const wishListProductService = new WishListProductService();

export class WishListProductController{

    //metodo para crear una sub categoria
    async createWishListProduct(req,res){
        const {id_product_details, id_users}= req.body;
        if (!id_product_details || !id_users ) {
        return res.status(400).json({ message: "todos los campos son obligatorios" });
        }
        const newWishListProduct= await wishListProductService.createWishListProduct(id_product_details, id_users);
        res.status(201).json(newWishListProduct)
    };

    //metodo para actualizar una sub categoria
    async updateWishListProduct(req,res){
        const {id_wish_list_product, id_product_details, id_users} = req.body;
        if (!id_wish_list_product || !id_product_details || !id_users){
            return res.status(400).json({ message: "todos los campos son obligatorios" });
        }
        const updateWishListProduct = await wishListProductService.updateWishListProduct(id_wish_list_product, id_product_details, id_users)
        res.status(204).json(updateWishListProduct)
    };

    //metodo para eliminar una sub categoria
    async deleteWishListProductById(req,res){
        const {id_wish_list_product} = req.body;
        if (!id_wish_list_product ){
            return res.status(400).json({ message: "todos los campos son obligatorios" });
        }
        const deleteWishListProduct = await wishListProductService.deleteWishListProductById(id_wish_list_product)
        res.status(204).json(deleteWishListProduct)
    };

    //metodo para obtener una sub categoria con su id
    async getWishListProductById(req,res){
        const {id_wish_list_product} = req.body;
        if (!id_wish_list_product ){
            return res.status(400).json({ message: "todos los campos son obligatorios" });
        }
        const getWishListProductById = await wishListProductService.getWishListProductById(id_wish_list_product)
        res.status(200).json(getWishListProductById)
    };

    //metodo para obtener todas las sub categorias
    async getAllWishListProducts(req,res){
        const getAllWishListProducts = await wishListProductService.getAllWishListProducts();
        res.status(200).json(getAllWishListProducts)
    };
}