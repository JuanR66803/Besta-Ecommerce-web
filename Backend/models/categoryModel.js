import pool from '../config/db.js';

export class CategoryModel {
  async createCategory(category_name) {
    const query = 'INSERT INTO category (category_name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [category_name]);
    return result.rows[0];
  }

  async updateCategory(id_category, category_name) {
    const query = 'UPDATE category SET category_name = $2 WHERE id_category = $1 RETURNING *';
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

  async getAllCategoriesWithSubcategories() {
    try {
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
      return result.rows;
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