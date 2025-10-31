import { useState, useEffect } from 'react';
// Importamos el hook para leer parámetros de la URL
import { useSearchParams } from 'react-router-dom';

// El hook ahora acepta 'itemsPerPage'
const useProducts = (filters, currentPage, itemsPerPage = 12) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  // Instancia para leer los searchParams
  const [searchParams] = useSearchParams();

  const fetchProducts = async signal => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      //Leemos el término de búsqueda de la URL
      const searchTerm = searchParams.get('search');

      if (searchTerm) {
        params.append('search', searchTerm);
      } else {
        // Los filtros de categoría solo se aplican si no hay una búsqueda de texto
        if (filters.categoryId)
          params.append('id_category', filters.categoryId?.toString() || '');
        if (filters.subcategoryId)
          params.append(
            'id_sub_category',
            filters.subcategoryId?.toString() || ''
          );
      }

      // La URL ahora puede contener el parámetro 'search'
      const url = `${
        import.meta.env.VITE_API_URL
      }/api/product/getAllProducts?${params.toString()}`;

      const response = await fetch(url, { signal });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      const formattedProductsMap = {};
      data.forEach(prod => {
        if (!formattedProductsMap[prod.id]) {
          formattedProductsMap[prod.id] = {
            id: prod.id,
            name: prod.name,
            description: prod.description,
            url_image: prod.url_image || '/placeholder-product.png',
            price: Number(prod.price) || 0,
            reference: `PRD-${prod.id}`,
            sizes: [prod.size],
            colors: [prod.color],
            total_stock: Number(prod.total_stock) || 0,
            category: { id: prod.category_id, name: prod.category_name },
            subcategory: {
              id: prod.subcategory_id,
              name: prod.subcategory_name,
            },
          };
        } else {
          if (
            prod.size &&
            !formattedProductsMap[prod.id].sizes.includes(prod.size)
          ) {
            formattedProductsMap[prod.id].sizes.push(prod.size);
          }
          if (
            prod.color &&
            !formattedProductsMap[prod.id].colors.includes(prod.color)
          ) {
            formattedProductsMap[prod.id].colors.push(prod.color);
          }
        }
      });
      const formattedProducts = Object.values(formattedProductsMap);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedProducts = formattedProducts.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      setProducts(paginatedProducts);
      setTotalProducts(formattedProducts.length);
      setTotalPages(Math.ceil(formattedProducts.length / itemsPerPage));
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Petición cancelada (AbortError)');
      } else {
        console.error('[useProducts] Error:', err.message);
        setError(err.message);
      }
    } finally {
      if (!signal || !signal.aborted) {
        setLoading(false);
      }
    }
  };

  // 5. MODIFICADO: El useEffect ahora crea el controller y lo pasa a fetch
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);

    return () => controller.abort();
  }, [
    filters.categoryId,
    filters.subcategoryId,
    currentPage,
    itemsPerPage,
    searchParams,
  ]);

  return {
    products,
    loading,
    error,
    totalPages,
    totalProducts,
    refetch: fetchProducts,
  };
};

export default useProducts;
