import { SubCategoryService } from "../services/subCategoryServices";

    const subCategoryService = new SubCategoryService();

export class SubCategoryController{

    //metodo para crear una sub categoria
    async createSubCategory(req,res){
        const {sub_category_name}= req.body;
        if (!sub_category_name ) {
        return res.status(400).json({ message: "el nombre de la sub categoria es obligatoria" });
        }
        const newSubCategory= await subCategoryService.createSubCategory(sub_category_name);
        res.status(201).json(newSubCategory)
    };

    //metodo para actualizar una sub categoria
    async updateSubCategory(req,res){
        const {id_sub_category, sub_category_name} = req.body;
        if (!id_sub_category || !sub_category_name){
            return res.status(400).json({ message: "el nombre y el id de la sub categoria es obligatoria " });
        }
        const updateSubCategory = await subCategoryService.updateSubCategory(id_sub_category, sub_category_name)
        res.status(204).json(updateSubCategory)
    };

    //metodo para eliminar una sub categoria
    async deleteSubCategoryById(req,res){
        const {id_sub_category} = req.body;
        if (!id_sub_category ){
            return res.status(400).json({ message: "el  el id de la sub categoria es obligatoria " });
        }
        const deleteSubCategory = await subCategoryService.deleteSubCategoryById(id_sub_category)
        res.status(204).json(deleteSubCategory)
    };

    //metodo para obtener una sub categoria con su id
    async getSubCategoryById(req,res){
        const {id_sub_category} = req.body;
        if (!id_sub_category ){
            return res.status(400).json({ message: "el  el id de la sub categoria es obligatoria " });
        }
        const getSubCategoryById = await subCategoryService.getSubCategoryById(id_sub_category)
        res.status(200).json(getSubCategoryByIdSubCategory)
    };

    //metodo para obtener todas las sub categorias
    async getAllSubCategories(req,res){
        const getAllCategories = await subCategoryService.getAllSubCategories();
        res.status(200).json(getAllCategories)
    };
}