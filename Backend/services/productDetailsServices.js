import { ProductDetailsModel } from "../models/productDetailsModel.js";

const productDetailsModel = new ProductDetailsModel();

export class ProductDetailsService {
  //metodo para crear una sub categoria
  async createProductDetails(id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise) {
    // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
    return await productDetailsModel.createProductDetails(id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise);
  }

  //metodo para acrualizar una sub categoria
  async updateProductDetails(id_product_details, id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise) {
    return await productDetailsModel.updateProductDetailsById(id_product_details, id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise);
  }

  //metodo para eliminar una sub categoria
  async deleteProductDetailsById(id_product_details) {
    return await productDetailsModel.deleteProductDetailsById(id_product_details);
  }

  //metodo para obtener una sub categoria con su id
  async getProductDetailsById(id_product_details) {
    return await productDetailsModel.getProductDetailsById(id_product_details);
  }

  //metodo para obtener todas las sub categorias
  async getAllProductDetails() {
    return await productDetailsModel.getAllProductDetails();
  }
}
