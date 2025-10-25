import { ProductDetailsModel } from '../models/productDetailsModel.js';

const productDetailsModel = new ProductDetailsModel();

export class ProductDetailsService {
  async getAllProductDetails(filters = {}) {
    try {
      console.log('[ProductDetailsService] Aplicando filtros:', filters);
      const result = await productDetailsModel.getAllProductDetails(filters);
      console.log(
        `[ProductDetailsService] ${result.length} detalles encontrados`
      );
      return result;
    } catch (error) {
      console.error(
        '[ERROR] ProductDetailsService.getAllProductDetails:',
        error
      );
      throw error;
    }
  }

  async getProductDetailById(id_product) {
    try {
      console.log(
        `[ProductDetailsService] Obteniendo producto ID: ${id_product}`
      );
      const result = await productDetailsModel.getProductDetailById(id_product);
      return result;
    } catch (error) {
      console.error(
        '[ERROR] ProductDetailsService.getProductDetailById:',
        error
      );
      throw error;
    }
  }

  async createProductDetails(
    id_product,
    id_product_state,
    id_color,
    product_price,
    stock,
    product_size,
    public_objetive,
    expertice
  ) {
    return await productDetailsModel.createProductDetails(
      id_product,
      id_product_state,
      id_color,
      product_price,
      stock,
      product_size,
      public_objetive,
      expertice
    );
  }

  async updateProductDetails(
    id_product_details,
    id_product,
    id_product_state,
    id_color,
    product_price,
    stock,
    product_size,
    public_objetive,
    expertise
  ) {
    return await productDetailsModel.updateProductDetailsById(
      id_product_details,
      id_product,
      id_product_state,
      id_color,
      product_price,
      stock,
      product_size,
      public_objetive,
      expertise
    );
  }

  async deleteProductDetailsById(id_product_details) {
    return await productDetailsModel.deleteProductDetailsById(
      id_product_details
    );
  }

  async getProductDetailsById(id_product_details) {
    return await productDetailsModel.getProductDetailsById(id_product_details);
  }
}
