import express from 'express';
import { CategoryController } from '../controllers/categoryController.js';

const categoryController = new CategoryController();
const router = express.Router();

router.post('/createCategory', (req, res) =>
  categoryController.createCategory(req, res)
);

router.put('/updateCategory', (req, res) =>
  categoryController.updateCategory(req, res)
);

router.delete('/deleteCategoryById/:id_category', (req, res) =>
  categoryController.deleteCategoryById(req, res)
);

router.get('/getCategoryById/:id_category', (req, res) =>
  categoryController.getCategoryById(req, res)
);

router.get('/getAllCategories', (req, res) =>
  categoryController.getAllCategoriesWithSubcategories(req, res)
);

export default router;
