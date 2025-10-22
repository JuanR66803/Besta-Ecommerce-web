import { useState, useEffect } from 'react';

const MOCK_CATEGORIES = [
  {
    id: 1,
    name: 'Calzado',
    subcategories: [
      { id: 1, name: 'Futbol' },
      { id: 2, name: 'Running' },
      { id: 3, name: 'Basketball' },
      { id: 4, name: 'Tenis' },
    ],
  },
  {
    id: 2,
    name: 'Ropa Deportiva',
    subcategories: [
      { id: 5, name: 'Camisetas' },
      { id: 6, name: 'Pantalones' },
      { id: 7, name: 'Shorts' },
      { id: 8, name: 'Chaquetas' },
    ],
  },
  {
    id: 3,
    name: 'Accesorios',
    subcategories: [
      { id: 9, name: 'Balones' },
      { id: 10, name: 'Mochilas' },
      { id: 11, name: 'Guantes' },
      { id: 12, name: 'Gorras' },
    ],
  },
];

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        '[useCategories] Intentando obtener categorias del backend...'
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/getAllCategories`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        console.warn('[useCategories] Backend no devolvio JSON valido');
        throw new Error('Respuesta del servidor no es JSON');
      }

      const text = await response.text();

      if (!text || text.trim().length === 0) {
        console.warn('[useCategories] Backend devolvio respuesta vacia');
        throw new Error('Respuesta vacia del servidor');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('[useCategories] Error al parsear JSON:', text);
        throw new Error('Respuesta del servidor no es JSON valido');
      }

      console.log('[useCategories] Respuesta del backend:', data);

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
        console.log(
          `[useCategories] ${formattedCategories.length} categorias del BACKEND`
        );
      } else {
        console.warn(
          '[useCategories] Backend devolvio datos invalidos, usando MOCK'
        );
        setCategories(MOCK_CATEGORIES);
        console.log(
          `[useCategories] ${MOCK_CATEGORIES.length} categorias MOCK cargadas`
        );
      }
    } catch (err) {
      console.error('[useCategories] Error:', err.message);
      console.warn('[useCategories] Usando datos MOCK por error');
      setCategories(MOCK_CATEGORIES);
      setError(null);
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
