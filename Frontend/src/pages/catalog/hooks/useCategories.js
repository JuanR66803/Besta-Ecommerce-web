import { useState, useEffect } from 'react';

// Hook personalizado para manejar la obtención de categorías y subcategorías

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener categorías con subcategorías desde el backend
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching categories...');
      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`
      );
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data || []);
        console.log('Categorías cargadas:', data.data?.length);
      } else {
        throw new Error(data.message || 'Error al cargar categorías');
      }
    } catch (err) {
      console.error('Error al cargar categorías:', err);
      setError(err.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  };
};

export default useCategories;