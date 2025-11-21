import fs from 'fs';
import { ProductDetailsService } from '../services/productDetailsServices.js';
import { ProductService } from '../services/productServices.js';
import cloudinary from '../config/cloudinaryConfig.js';
import { SubCategoryService } from '../services/subCategoryServices.js';
import { ColorService } from '../services/colorServices.js';
import { ProductStateService } from '../services/productStateServices.js';
import { ProductImageService } from '..//services/productImageService.js';

const productDetailsService = new ProductDetailsService();
const productService = new ProductService();
const subCategoryService = new SubCategoryService();
const colorService = new ColorService();
const productStateService = new ProductStateService();
const produtImageService = new ProductImageService();

export class ProductDetailsController {
  //un controlador la funcion especifica que tiene es recibir o mandar peticiones HTTP y consumir servicios

  //metodo para crear una sub categoria
  async createProductDetails(req, res) {
    try {
      const {
        productName,
        product_price,
        stock,
        description,
        category,
        state,
        subcategory,
        size,
        targetAudience,
        experienceLevel,
        colors,
      } = req.body;
      const imageFiles = req.files; //recibir multiples archivos
      let productColors = [];
      try {
        productColors = JSON.parse(colors);
      } catch (e) {
        return res.status(400).json({ message: 'Formato de colores inválido' });
      }

      if (
        !productName ||
        !state ||
        !productColors.length ||
        !product_price ||
        !stock ||
        !size ||
        !targetAudience ||
        !experienceLevel ||
        !description ||
        !category ||
        !subcategory
      ) {
        if (imageFiles) {
          imageFiles.forEach(file => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        }
        return res
          .status(400)
          .json({ message: 'Todos los campos son obligatorios' });
      }

      let imageUrls = [];
      if (imageFiles && imageFiles.length > 0) {
        try {
          for (const file of imageFiles) {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: 'your_ecommerce_products',
            });
            imageUrls.push(result.secure_url);
            fs.unlinkSync(file.path); // Eliminar archivo local después de subirlo
          }
        } catch (error) {
          console.error('Error al subir imágenes a Cloudinary:', error);
          return res
            .status(500)
            .json({ message: 'Error al procesar y subir las imágenes' });
        }
      }

      const findState = await productStateService.getProductStateByName(state);
      const newColors = await colorService.createColor(productColors);
      const stateId = findState.id_product_state;

      const newProduct = await productService.createProduct(
        Number(subcategory),
        productName,
        description
      );
      const id_product = newProduct.id_product;

      // Guardar las URLs de las imágenes en la base de datos
      for (const imageUrl of imageUrls) {
        try {
          // Crear la URL de la imagen en la tabla `url_image`
          const create_image_url = await produtImageService.createImageUrl(
            imageUrl
          );
          if (!create_image_url || !create_image_url.id_url_image) {
            throw new Error('No se pudo obtener el ID de la URL de la imagen');
          }

          // Obtener el ID de la URL de la imagen
          const id_image_url = create_image_url.id_url_image;

          // Crear la relación entre el producto y la imagen en la tabla `product_image`
          await produtImageService.createProductImage(id_product, id_image_url);
        } catch (error) {
          console.error(
            'Error al guardar la imagen en la base de datos:',
            error
          );
          return res
            .status(500)
            .json({
              message: 'Error al guardar las imágenes en la base de datos',
            });
        }
      }

      const newProductDetails =
        await productDetailsService.createProductDetails(
          id_product,
          stateId,
          newColors.id_color,
          product_price,
          stock,
          size,
          targetAudience,
          experienceLevel
        );

      return res.status(201).json({
        message: 'Producto creado correctamente',
        product: newProduct,
        details: newProductDetails,
        images: imageUrls,
      });
    } catch (error) {
      console.error('Error inesperado en createProductDetails:', error);
      return res
        .status(500)
        .json({ message: 'Error interno del servidor', error: error.message });
    }
  }

  //metodo para actualizar una sub categoria
  async updateProductDetails(req, res) {
    const {
      id_product_details,
      id_product,
      id_product_state,
      id_color,
      product_price,
      stock,
      product_size,
      public_objetive,
      expertise,
    } = req.body;
    if (
      !id_product_details ||
      !id_product ||
      !id_product_state ||
      !id_color ||
      !product_price ||
      !stock ||
      !product_size ||
      !public_objetive ||
      !expertise
    ) {
      return res
        .status(400)
        .json({ message: 'todos los campos son obligatorios ' });
    }
    const updateProductDetails =
      await productDetailsService.updateProductDetails(
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
    res.status(204).json(updateProductDetails);
  }

  //metodo para eliminar una sub categoria
  async disableProduct(req, res) {
    const { id_product } = req.body;
    if (!id_product) {
      return res
        .status(400)
        .json({ message: 'todos los campos son obligatorios ' });
    }
    const disableProduct =
      await productDetailsService.disableProduct(id_product);
    res.status(204).json(disableProduct);
  }
  async enableProduct(req, res) {
    const { id_product } = req.body;
    if (!id_product) {
      return res
        .status(400)
        .json({ message: 'todos los campos son obligatorios ' });
    }
    const enableProduct = await productDetailsService.enableProduct(id_product);
    res.status(204).json(enableProduct);
  }
  


  //metodo para obtener todas las sub categorias
  async getAllProductDetails(req, res) {
    const getAllProductDetails =
      await productDetailsService.getAllProductDetails();
    res.status(200).json(getAllProductDetails);
  }
  async getAllInhabilitados(req, res) {
    try {
      const allProducts = await productDetailsService.getAllInhabilitados();
      res.status(200).json(allProducts);
    } catch (error) {
      console.error('Error fetching inhabilitados products:', error);
      res.status(500).json({
        message: 'Error al obtener productos inhabilitados',
        error: error.message,
      });
    }
  }

  // Metodo Específico para el catálogo
  async getCatalogProducts(req, res) {
    try {
      const queryParams = {
        id_category: req.query.id_category,
        id_sub_category: req.query.id_sub_category,
        search: req.query.search,
      };

      const products = await productDetailsService.getCatalogProducts(
        queryParams
      );
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching catalog products:', error);
      res.status(500).json({
        message: 'Error al obtener productos del catálogo',
        error: error.message,
      });
    }
  }
}
