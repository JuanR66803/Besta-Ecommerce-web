import {ProductModel} from "../models/productModel.js" ;

const productModel = new ProductModel();

export class ProductService{
    
    //metodo para crear un producto
    async createProduct(id_sub_category, product_name, url_image, description){
        // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
        return (await productModel.createProduct(id_sub_category, product_name, url_image, description));
    };

    //metodo para acrualizar un producto
    async updateProduct(id_product, id_sub_category, product_name, url_image, description){
        return (await productModel.updateProductById(id_product, id_sub_category, product_name, url_image, description));
    };

    //metodo para eliminar un producto
    async deleteProductById(id_product){
        return (await productModel.deleteProductById(id_product));
    };

    //metodo para obtener un producto con su id
    async getProductById(id_product){
        return (await productModel.getProductById(id_product));
    };

    //metodo para obtener todos los productos
    async getAllProducts(){
        return (await productModel.getAllProducts())
    };
}

