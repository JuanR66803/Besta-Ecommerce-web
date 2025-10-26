import express from 'express';
import { CategoryController } from '../controllers/categoryController.js';

const categoryController = new CategoryController();

const router = express.Router();
router.post("/createCategory", categoryController.createCategory);
router.put("/updateCategoryById", categoryController.updateCategory);
router.delete("/deleteCategoryById", categoryController.deleteCategoryById);
router.get("/getAllCategories", categoryController.getAllCategories);
router.get("/getCategoryById", categoryController.getCategoryById);
router.get("/getAllCategoriesWithSubcategories", categoryController.getAllCategoriesWithSubcategories);

export default router;
