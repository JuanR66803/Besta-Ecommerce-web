import { useState, useEffect } from 'react';

const useProducts = (filters, currentPage) => { //filtros y página actual
  // Estados para productos, carga, error, paginación
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);


   // esta función para obtener productos desde el backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Construir parámetros de consulta
      const params = new URLSearchParams();
      
      if (filters.categoryId) {
        params.append('categoryId', filters.categoryId);
      }
      
      if (filters.subcategoryId) {
        params.append('subcategoryId', filters.subcategoryId);
      }
      
      params.append('page', currentPage);
      params.append('limit', 20);

      console.log('📡 Fetching products with params:', params.toString());

      // Realizar petición
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalProducts(data.pagination?.totalItems || 0);
        console.log('Productos cargados:', data.data?.length);
      } else {
        throw new Error(data.message || 'Error al cargar productos');
      }
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetch cuando cambien los filtros o la página
  useEffect(() => {
    fetchProducts();
  }, [filters.categoryId, filters.subcategoryId, currentPage]);

  return {
    products,
    loading,
    error,
    totalPages,
    totalProducts,
    refetch: fetchProducts
  };
};

export default useProducts;