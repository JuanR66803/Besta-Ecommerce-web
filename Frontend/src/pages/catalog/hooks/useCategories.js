import { useState, useEffect } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(
          '[useCategories] Intentando obtener categorias del backend...'
        );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/getAllCategoriesWithSubcategories`
      );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('[useCategories] Respuesta del backend:', data);

        console.log(
          '[DEBUG] Categorias antes de formatear:',
          JSON.stringify(data, null, 2)
        );

        if (!Array.isArray(data)) {
          throw new Error('La respuesta no es un array');
        }

        const formattedCategories = data.map(cat => {
          console.log('[DEBUG] Procesando categoria:', cat);

          return {
            id: cat.id || cat.id_category,
            name: cat.name || cat.category_name,
            subcategories: Array.isArray(cat.subcategories)
              ? cat.subcategories.map(sub => ({
                  id: sub.id || sub.id_sub_category,
                  name: sub.name || sub.sub_category_name,
                }))
              : [],
          };
        });

        console.log(
          '[DEBUG] Categorias formateadas:',
          JSON.stringify(formattedCategories, null, 2)
        );

        setCategories(formattedCategories);
        console.log(
          `[useCategories] ${formattedCategories.length} categorias del BACKEND`
        );
      } catch (err) {
        console.error('[useCategories] Error al obtener categorias:', err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
