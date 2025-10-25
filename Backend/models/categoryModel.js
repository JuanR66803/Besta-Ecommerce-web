import pool from '../config/db.js';

export class CategoryModel {
  async createCategory(category_name) {
    const query =
      'INSERT INTO category (category_name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [category_name]);
    return result.rows[0];
  }

  async updateCategory(id_category, category_name) {
    const query =
      'UPDATE category SET category_name = $2 WHERE id_category = $1 RETURNING *';
    const result = await pool.query(query, [id_category, category_name]);
    return result.rows[0];
  }

  async deleteCategoryById(id_category) {
    const query = 'DELETE FROM category WHERE id_category = $1 RETURNING *';
    const result = await pool.query(query, [id_category]);
    return result.rows[0];
  }

  async getCategoryById(id_category) {
    const query = 'SELECT * FROM category WHERE id_category = $1';
    const result = await pool.query(query, [id_category]);
    return result.rows[0];
  }

  async getAllCategories() {
    const query = 'SELECT * FROM category ORDER BY category_name';
    const result = await pool.query(query);
    return result.rows;
  }

  // ✅ MÉTODO ACTUALIZADO: Obtener categorías con subcategorías
  async getAllCategoriesWithSubcategories() {
    try {
      console.log('🔍 [CategoryModel] Ejecutando query con subcategorías...');

      const query = `
                SELECT 
                    c.id_category,
                    c.category_name,
                    COALESCE(
                        json_agg(
                            json_build_object(
                                'id', sc.id_sub_category,
                                'name', sc.sub_category_name
                            )
                            ORDER BY sc.sub_category_name
                        ) FILTER (WHERE sc.id_sub_category IS NOT NULL),
                        '[]'::json
                    ) as subcategories
                FROM category c
                LEFT JOIN sub_category sc ON c.id_category = sc.id_category
                GROUP BY c.id_category, c.category_name
                ORDER BY c.category_name;
            `;

      const result = await pool.query(query);

      console.log(
        `✅ [CategoryModel] ${result.rows.length} categorías encontradas`
      );

      // Formatear datos para el frontend
      const formattedCategories = result.rows.map(row => {
        console.log(
          `📦 [CategoryModel] Categoría: ${row.category_name}, Subcategorías:`,
          row.subcategories
        );

        return {
          id_category: row.id_category,
          category_name: row.category_name,
          subcategories: Array.isArray(row.subcategories)
            ? row.subcategories
            : [],
        };
      });

      return formattedCategories;
    } catch (error) {
      console.error('❌ Error en getAllCategoriesWithSubcategories:', error);
      throw error;
    }
  }

  async getCategoriesByName(category_name) {
    const query = 'SELECT id_category FROM category WHERE category_name = $1';
    const result = await pool.query(query, [category_name]);
    return result.rows[0];
  }
}

const categoryModel = new CategoryModel();

export class CategoryService {
  async createCategory(category_name) {
    try {
      const result = await categoryModel.createCategory(category_name);
      return result;
    } catch (error) {
      console.error('Error en categoryService.createCategory:', error);
      throw error;
    }
  }

  async updateCategory(id_category, category_name) {
    try {
      const result = await categoryModel.updateCategory(
        id_category,
        category_name
      );
      return result;
    } catch (error) {
      console.error('Error en categoryService.updateCategory:', error);
      throw error;
    }
  }

  async deleteCategoryById(id_category) {
    try {
      const result = await categoryModel.deleteCategoryById(id_category);
      return result;
    } catch (error) {
      console.error('Error en categoryService.deleteCategoryById:', error);
      throw error;
    }
  }

  async getCategoryById(id_category) {
    try {
      const result = await categoryModel.getCategoryById(id_category);
      return result;
    } catch (error) {
      console.error('Error en categoryService.getCategoryById:', error);
      throw error;
    }
  }

  async getAllCategories() {
    try {
      console.log(
        '[CategoryService] Obteniendo categorías con subcategorías...'
      );
      const result = await categoryModel.getAllCategoriesWithSubcategories();
      console.log(
        `[CategoryService] ${result?.length || 0} categorías obtenidas`
      );
      return result || [];
    } catch (error) {
      console.error('Error en categoryService.getAllCategories:', error);
      throw error;
    }
  }
}
