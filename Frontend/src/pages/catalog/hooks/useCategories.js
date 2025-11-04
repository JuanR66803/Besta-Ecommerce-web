import { useState, useEffect } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/getAllCategoriesWithSubcategories`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Respuesta del servidor no es JSON');
      }

      const text = await response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('Respuesta vacia del servidor');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error('Respuesta del servidor no es JSON valido');
      }
      let isValidData = false;
      let formattedCategories = [];

      if (Array.isArray(data) && data.length > 0) {
        formattedCategories = data.map(cat => ({
          id: cat.id_category || cat.id,
          name: cat.category_name || cat.name,
          subcategories: cat.subcategories || [],
        }));
        isValidData = true;
      } else if (
        data.success &&
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {
        formattedCategories = data.data.map(cat => ({
          id: cat.id_category || cat.id,
          name: cat.category_name || cat.name,
          subcategories: cat.subcategories || [],
        }));
        isValidData = true;
      }

      if (isValidData) {
        setCategories(formattedCategories);
      }
    } catch (err) {
      console.error('[useCategories] Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};

export default useCategories;
