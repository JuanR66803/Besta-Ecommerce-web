import { useState, useEffect } from 'react';

// El hook ahora acepta 'itemsPerPage'
const useProducts = (filters, currentPage, itemsPerPage = 12) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // 1. MODIFICADO: Hacemos que fetchProducts acepte un 'signal'
  const fetchProducts = async (signal) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      // NOTA: Tu paginación es del lado del cliente, así que no se envía 'currentPage'
      if (filters.categoryId) params.append('id_category', filters.categoryId?.toString() || '');
      if (filters.subcategoryId) params.append('id_sub_category', filters.subcategoryId?.toString() || '');

      const url = `${import.meta.env.VITE_API_URL}/api/product/getAllProducts?${params.toString()}`;
      
      // 2. MODIFICADO: Pasamos el 'signal' al fetch
      const response = await fetch(url, { signal });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      // (Tu lógica de formato de productos está bien)
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
            subcategory: { id: prod.subcategory_id, name: prod.subcategory_name }
          };
        } else {
          // Asegúrate de que prod.size y prod.color no sean null/undefined
          if (prod.size && !formattedProductsMap[prod.id].sizes.includes(prod.size)) {
            formattedProductsMap[prod.id].sizes.push(prod.size);
          }
          if (prod.color && !formattedProductsMap[prod.id].colors.includes(prod.color)) {
            formattedProductsMap[prod.id].colors.push(prod.color);
          }
        }
      });
      const formattedProducts = Object.values(formattedProductsMap);
      // Usamos el 'itemsPerPage' dinámico en lugar de un valor fijo
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedProducts = formattedProducts.slice(startIndex, startIndex + itemsPerPage);

      setProducts(paginatedProducts);
      setTotalProducts(formattedProducts.length);
      setTotalPages(Math.ceil(formattedProducts.length / itemsPerPage));

    } catch (err) {
      // 3. MODIFICADO: Ignoramos el error si fue por "abortar"
      if (err.name === 'AbortError') {
        console.log('Petición cancelada (AbortError)');
      } else {
        console.error('[useProducts] Error:', err.message);
        setError(err.message);
      }
    } finally {
      // 4. MODIFICADO: Solo paramos 'loading' si la petición no fue abortada
      if (!signal || !signal.aborted) {
        setLoading(false);
      }
    }
  };

  // 5. MODIFICADO: El useEffect ahora crea el controller y lo pasa a fetch
  useEffect(() => {
    // Creamos un controlador para esta ejecución del efecto
    const controller = new AbortController();
    
    // Llamamos a fetchProducts y le pasamos el 'signal'
    fetchProducts(controller.signal);

    // Función de limpieza: se ejecuta cuando el efecto vuelve a correr
    // (o cuando el componente se desmonta)
    return () => {
      // Cancela la petición anterior
      controller.abort();
    };
    // Añadimos 'itemsPerPage' a las dependencias del efecto
  }, [filters.categoryId, filters.subcategoryId, currentPage, itemsPerPage]);

  // Tu 'refetch' seguirá funcionando para llamadas manuales
  return { products, loading, error, totalPages, totalProducts, refetch: fetchProducts };
};

export default useProducts;