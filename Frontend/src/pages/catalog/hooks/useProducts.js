import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useProducts = (filters, currentPage, itemsPerPage = 12) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchParams] = useSearchParams();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      const searchTerm = searchParams.get('search');

      if (searchTerm) {
        params.append('search', searchTerm);
      } else {
        if (filters.categoryId)
          params.append('id_category', filters.categoryId.toString());
        if (filters.subcategoryId)
          params.append('id_sub_category', filters.subcategoryId.toString());
      }

      const url = `${import.meta.env.VITE_API_URL
        }/api/product/getAllProducts?${params.toString()}`;

      const response = await fetch(url);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      // Formatear productos
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
            sizes: prod.size ? [prod.size] : [],
            colors: prod.color ? [prod.color] : [],
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
      console.error('[useProducts] Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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