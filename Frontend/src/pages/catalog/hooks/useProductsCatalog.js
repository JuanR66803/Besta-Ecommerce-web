import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useProductsCatalog = (currentPage, itemsPerPage) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [searchParams, currentPage, itemsPerPage]);

  const fetchProducts = async (signal) => {
    try {
      setLoading(true);
      setError(null);

      const baseURL = import.meta.env.VITE_API_URL;
      const params = new URLSearchParams();

      const categoryId = searchParams.get('category');
      const subcategoryId = searchParams.get('subcategory');
      const searchTerm = searchParams.get('search');

      if (categoryId) params.append('id_category', categoryId);
      if (subcategoryId) params.append('id_sub_category', subcategoryId);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(
        `${baseURL}/api/productDetails/catalog?${params.toString()}`,
        { signal }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();

      // Formatear productos con la estructura de múltiples imágenes
      const formattedProducts = data.map(product => ({
        id: product.id_product_details,
        name: product.product_name,
        description: product.description,
        images: product.images || [], // Array de URLs de Cloudinary
        url_image: product.images?.[0] || '/placeholder-product.png', // Primera imagen como principal
        price: Number(product.product_price) || 0,
        sizes: product.product_size ? [product.product_size] : [],
        colors: [],
        total_stock: Number(product.stock) || 0,
        category: { 
          id: product.id_category, 
          name: product.category_name 
        },
        subcategory: { 
          id: product.id_sub_category, 
          name: product.sub_category_name 
        }
      }));

      // Paginación
      setTotalProducts(formattedProducts.length);
      const totalPages = Math.ceil(formattedProducts.length / itemsPerPage);
      setTotalPages(totalPages);
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedProducts = formattedProducts.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      setProducts(paginatedProducts);

    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('[useProductsCatalog] Petición cancelada');
        return;
      }
      console.error('[useProductsCatalog] Error:', err.message);
      toast.error(`Error al cargar productos: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    totalPages,
    totalProducts,
  };
};