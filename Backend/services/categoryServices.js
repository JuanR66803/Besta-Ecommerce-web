import {CategoryModel} from "../models/categoryModel.js" ;

const categoryModel = new CategoryModel();

export class CategoryService{
    
    //metodo para crear una categoria
    async createCategory(category_name){
        // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
        return (await categoryModel.createCategory(category_name));
    };

    //metodo para acrualizar una categoria
    async updateCategory(id_category,category_name){
        return (await categoryModel.updateCategoryById(id_category, category_name));
    };

    //metodo para eliminar una categoria
    async deleteCategoryById(id_category){
        return (await categoryModel.deleteCategoryById(id_category));
    };

    //metodo para obtener una categoria con su id
    async getCategoryById(id_category){
        return (await categoryModel.getCategoryById(id_category));
    };

    //metodo para obtener todas las categorias
    async getAllCategories(){
        return (await categoryModel.getaAllCategories())
    };
}

