import { CategoryService } from '../services/categoryServices.js';

const categoryService = new CategoryService();

export class CategoryController {
  async createCategory(req, res) {
    try {
      const { category_name } = req.body;

      if (!category_name) {
        return res.status(400).json({
          success: false,
          message: 'El nombre de la categoría es requerido',
        });
      }

      const result = await categoryService.createCategory(category_name);

      return res.status(201).json({
        success: true,
        message: 'Categoría creada exitosamente',
        data: result,
      });
    } catch (error) {
      console.error('Error en createCategory:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al crear la categoría',
        error: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id_category, category_name } = req.body;

      if (!id_category || !category_name) {
        return res.status(400).json({
          success: false,
          message: 'ID y nombre de la categoría son requeridos',
        });
      }

      const result = await categoryService.updateCategory(
        id_category,
        category_name
      );

      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Categoría actualizada exitosamente',
        data: result,
      });
    } catch (error) {
      console.error('Error en updateCategory:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar la categoría',
        error: error.message,
      });
    }
  }

  async deleteCategoryById(req, res) {
    try {
      const { id_category } = req.params;

      if (!id_category) {
        return res.status(400).json({
          success: false,
          message: 'ID de la categoría es requerido',
        });
      }

      const result = await categoryService.deleteCategoryById(id_category);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Categoría eliminada exitosamente',
        data: result,
      });
    } catch (error) {
      console.error('Error en deleteCategoryById:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar la categoría',
        error: error.message,
      });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id_category } = req.params;

      if (!id_category) {
        return res.status(400).json({
          success: false,
          message: 'ID de la categoría es requerido',
        });
      }

      const result = await categoryService.getCategoryById(id_category);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada',
        });
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error en getCategoryById:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener la categoría',
        error: error.message,
      });
    }
  }

  async getAllCategories(req, res) {
    try {
      console.log('[CategoryController] Obteniendo todas las categorías...');
      const result = await categoryService.getAllCategories();

      console.log(
        `[CategoryController] ${result?.length || 0} categorías encontradas`
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error('[CategoryController] Error en getAllCategories:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las categorías',
        error: error.message,
      });
    }
  }

  async getAllCategoriesWithSubcategories(req, res) {
    try {
      console.log(
        '[CategoryController] Obteniendo categorías con subcategorías...'
      );
      const result = await categoryService.getAllCategories();

      console.log(
        `[CategoryController] ${
          result?.length || 0
        } categorías con subcategorías encontradas`
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(
        '[CategoryController] Error en getAllCategoriesWithSubcategories:',
        error
      );
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las categorías con subcategorías',
        error: error.message,
      });
    }
  }
}
