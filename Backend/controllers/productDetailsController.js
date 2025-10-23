import { ProductDetailsService } from "../services/productDetailsServices.js";
import { ProductService } from "../services/productServices.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { SubCategoryService } from "../services/subCategoryServices.js";
import { ColorService } from "../services/colorServices.js";
import { ProductStateService} from "../services/productStateServices.js";

const productDetailsService = new ProductDetailsService();
const productService = new ProductService();
const subCategoryService = new SubCategoryService();
const colorService = new ColorService();
const productStateService = new ProductStateService();


export class ProductDetailsController {
    //un controlador la funcion especifica que tiene es recibir o mandar peticiones HTTP y consumir servicios

    //metodo para crear una sub categoria
    async createProductDetails(req, res) {
        // Desestructuración de los campos de texto/número enviados en req.body
        const { productName, product_price, stock, description, category, state, subcategory, size, targetAudience, experienceLevel, colors } = req.body;

        const imageFile = req.file;

        let productColors = [];
        try {
            productColors = JSON.parse(colors);
        } catch (e) {
            return res.status(400).json({ message: "Formato de colores inválido" });
        }


        if (!productName || !state || !productColors.length || !product_price || !stock || !size || !targetAudience || !experienceLevel || !description || !category || !subcategory) {
            if (imageFile && fs.existsSync(imageFile.path)) {
                fs.unlinkSync(imageFile.path);
            }
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        let imageUrl = null;
        if (imageFile) {
            try {
                const result = await cloudinary.uploader.upload(imageFile.path, {
                    folder: "your_ecommerce_products"
                });
                imageUrl = result.secure_url;
                fs.unlinkSync(imageFile.path);

            } catch (error) {
                console.error("Error al subir imagen a Cloudinary:", error);
                return res.status(500).json({ message: "Error al procesar y subir la imagen" });
            }
        }

        try {
            //parte de sincronizar llaves foraneas
            //consumir servicios para obtener los ids
            const findSubcategory = await subCategoryService.getSubCategoriesByName(subcategory);
            const findState = await productStateService.getProductStateByName(state);
            const newColors = await colorService.createColor(productColors);
            //aqui es donde se obtienen los ids
            const subCategoryId = findSubcategory.id_sub_category;
            const stateId= findState.id_product_state;
            const colorsId= newColors.id_color;
            //creacion del producto y va consumir el la llave foranea de subcategoria
            const newProduct = await productService.createProduct({ productName, description, subCategoryId, imageUrl });

            const id_product = newProduct.id_product;

            // Segundo, crear los detalles del producto (asumiendo que aquí va el resto de la información)
            const newProductDetails = await productDetailsService.createProductDetails({id_product,stateId,colorsId,product_price,stock,size,targetAudience,experienceLevel});

            res.status(201).json({
                product: newProduct,
                details: newProductDetails
            });

        } catch (serviceError) {
            console.error("Error al guardar el producto y sus detalles:", serviceError);
            res.status(500).json({ message: "Error interno al guardar la información del producto." });
        }

    };

    //metodo para actualizar una sub categoria
    async updateProductDetails(req, res) {
        const { id_product_details, id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise } = req.body;
        if (!id_product_details || !id_product || !id_product_state || !id_color || !product_price || !stock || !product_size || !public_objetive || !expertise) {
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const updateProductDetails = await productDetailsService.updateProductDetails(id_product_details, id_product, id_product_state, id_color, product_price, stock, product_size, public_objetive, expertise)
        res.status(204).json(updateProductDetails)
    };

    //metodo para eliminar una sub categoria
    async deleteProductDetailsById(req, res) {
        const { id_product_details } = req.body;
        if (!id_product_details) {
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const deleteProductDetails = await productDetailsService.deleteProductDetailsById(id_product_details)
        res.status(204).json(deleteProductDetails)
    };

    //metodo para obtener una sub categoria con su id
    async getProductDetailsById(req, res) {
        const { id_product_details } = req.body;
        if (!id_product_details) {
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const getProductDetailsById = await productDetailsService.getProductDetailsById(id_product_details)
        res.status(200).json(getProductDetailsById)
    };

    //metodo para obtener todas las sub categorias
    async getAllProductDetails(req, res) {
        const getAllProductDetails = await productDetailsService.getAllProductDetails();
        res.status(200).json(getAllProductDetails)
    };
}