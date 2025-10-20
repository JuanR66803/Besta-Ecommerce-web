import { CategoryService } from "../services/categoryService";

    const categoryService = new CategoryService();

export class CategoryController{

    //metodo para crear una categoria
    async createCategory(req,res){
        const {category_name}= req.body;
        if (!category_name ) {
        return res.status(400).json({ message: "el nombre de la categoria es obligatoria" });
        }
        const newCategory= await categoryService.createCategory(category_name);
        res.status(201).json(newCategory)
    };

    //metodo para actualizar una categoria
    async updateCategory(req,res){
        const {id_category, category_name} = req.body;
        if (!id_category || !category_name){
            return res.status(400).json({ message: "el nombre y el id de la categoria es obligatoria " });
        }
        const updateCategory = await categoryService.updateCategory(id_category, category_name)
        res.status(204).json(updateCategory)
    };

    //metodo para eliminar una categoria
    async deleteCategoryById(req,res){
        const {id_category} = req.body;
        if (!id_category ){
            return res.status(400).json({ message: "el  el id de la categoria es obligatoria " });
        }
        const deleteCategory = await categoryService.deleteCategoryById(id_category)
        res.status(204).json(deleteCategory)
    };

    //metodo para obtener una categoria con su id
    async getCategoryById(req,res){
        const {id_category} = req.body;
        if (!id_category ){
            return res.status(400).json({ message: "el  el id de la categoria es obligatoria " });
        }
        const getCategoryById = await categoryService.getCategoryById(id_category)
        res.status(200).json(getCategoryByIdCategory)
    };

    //metodo para obtener todas las categorias
    async getAllCategories(req,res){
        const getAllCategories = await categoryService.getAllCategories();
        res.status(200).json(getAllCategories)
    };
}