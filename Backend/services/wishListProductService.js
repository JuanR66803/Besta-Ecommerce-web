import {WishListProductModel} from "../models/wishListProductModel.js" ;

const wishListProductModel = new WishListProductModel();

export class WishListProductService{
    
    //metodo para crear un producto de la lista de deseados
    async createWishListProduct(id_product_details, id_users){
        // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
        return (await wishListProductModel.createWishListProduct(id_product_details, id_users));
    };

    //metodo para acrualizar un producto de la lista de deseados
    async updateWishListProduct(id_wish_list_product, id_product_details, id_users){
        return (await wishListProductModel.updateWishListProductById(id_wish_list_product, id_product_details, id_users));
    };

    //metodo para eliminar un producto de la lista de deseados
    async deleteWishListProductById(id_wish_list_product){
        return (await wishListProductModel.deleteWishListProductById(id_wish_list_product));
    };

    //metodo para obtener un producto de la lista de deseados con su id
    async getWishListProductById(id_wish_list_product){
        return (await wishListProductModel.getWishListProductById(id_wish_list_product));
    };

    //metodo para obtener todas los productos en la lista de deseados
    async getAllWishListProducts(){
        return (await wishListProductModel.getAllWishListProducts())
    };
}

