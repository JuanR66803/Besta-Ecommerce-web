import {SubCategoryModel} from "../models/subCategoryModel.js" ;

const subCategoryModel = new SubCategoryModel();

export class SubCategoryService{
    
    //metodo para crear una sub categoria
    async createSubCategory(sub_category_name){
        // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
        return (await subCategoryModel.createSubCategory(sub_category_name));
    };

    //metodo para acrualizar una sub categoria
    async updateSubCategory(id_sub_category,sub_category_name){
        return (await subCategoryModel.updateSubCategoryById(id_sub_category, sub_category_name));
    };

    //metodo para eliminar una sub categoria
    async deleteSubCategoryById(id_sub_category){
        return (await subCategoryModel.deleteSubCategoryById(id_sub_category));
    };

    //metodo para obtener una sub categoria con su id
    async getSubCategoryById(id_sub_category){
        return (await subCategoryModel.getSubCategoryById(id_sub_category));
    };

    //metodo para obtener todas las sub categorias
    async getAllSubCategories(){
        return (await subCategoryModel.getAllSubCategories())
    };
}

