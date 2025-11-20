import { ProductImageModel } from "../models/productImageModel.js";

const productImageModel = new ProductImageModel();

export class ProductImageService {

    //metodo para crear una imagen de producto
    async createProductImage(id_product, id_url_image) {
        return await productImageModel.createProductImage(id_product, id_url_image);
    };
    async createImageUrl(url_image) {
        return await productImageModel.createImageUrl(url_image);
    };
    async updateProductImageById (id_product_image, id_product, id_url_image){
        return await productImageModel.updateProductImageById (id_product_image, id_product, id_url_image);
    };
    async updateImageUrlById (id_url_image, url_image){
        return await productImageModel.updateImageUrlById (id_url_image, url_image);
    };
}