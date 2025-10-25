import { CategoryService } from '../services/categoryServices.js';

const categoryService = new CategoryService();

export class CategoryController {
  // ... (tus otros métodos como create, update, delete)

  //metodo para crear una categoria
  async createCategory(req, res) {
    try {
      const { category_name } = req.body;
      if (!category_name) {
        return res.status(400).json({ success: false, message: 'El nombre de la categoría es requerido' });
      }
      const newCategory = await categoryService.createCategory(category_name);
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear la categoría', error: error.message });
    }
  }

  //metodo para actualizar una categoria
  async updateCategory(req, res) {
    try {
      const { id_category, category_name } = req.body;
      if (!id_category || !category_name) {
        return res.status(400).json({ success: false, message: 'ID y nombre son requeridos' });
      }
      const updatedCategory = await categoryService.updateCategory(id_category, category_name);
      if (!updatedCategory) {
        return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
      }
      res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar la categoría', error: error.message });
    }
  }

  //metodo para eliminar una categoria
  async deleteCategoryById(req, res) {
    try {
      const { id_category } = req.params; // Los IDs suelen venir por params en DELETE
      if (!id_category) {
        return res.status(400).json({ success: false, message: 'El ID es requerido' });
      }
      const deletedCategory = await categoryService.deleteCategoryById(id_category);
      if (!deletedCategory) {
        return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
      }
      res.status(200).json({ success: true, message: 'Categoría eliminada' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar la categoría', error: error.message });
    }
  }

  //metodo para obtener una categoria con su id
  async getCategoryById(req, res) {
    try {
      const { id_category } = req.params; // Los IDs suelen venir por params en GET
      if (!id_category) {
        return res.status(400).json({ success: false, message: 'El ID es requerido' });
      }
      const category = await categoryService.getCategoryById(id_category);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
      }
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener la categoría', error: error.message });
    }
  }

  // ✅ MÉTODO CORREGIDO Y CENTRALIZADO
  async getAllCategories(req, res) {
    try {
      // El servicio ya está configurado para llamar al método con subcategorías
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('[ERROR] en CategoryController.getAllCategories:', error);
      res.status(500).json({ success: false, message: 'Error al obtener las categorías', error: error.message });
    }
  }
}