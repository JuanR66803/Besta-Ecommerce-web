import { useState, useEffect } from 'react';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Guayos Nike Mercurial Vapor 15',
    description: 'Guayos profesionales para futbol de alta velocidad con tecnologia Nike Gripknit',
    url_image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400',
    price: 899900,
    subcategory: { id: 1, name: 'Futbol' },
    category: { id: 1, name: 'Calzado' }
  },
  {
    id: 2,
    name: 'Zapatillas Adidas Ultraboost 23',
    description: 'Zapatillas de running con tecnologia Boost para maxima amortiguacion',
    url_image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    price: 749900,
    subcategory: { id: 2, name: 'Running' },
    category: { id: 1, name: 'Calzado' }
  },
  {
    id: 3,
    name: 'Jordan Air Retro 1 High',
    description: 'Zapatillas de basketball iconicas edicion limitada',
    url_image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    price: 1299900,
    subcategory: { id: 3, name: 'Basketball' },
    category: { id: 1, name: 'Calzado' }
  },
  {
    id: 4,
    name: 'Nike Court Vapor',
    description: 'Zapatillas de tenis con soporte lateral mejorado',
    url_image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    price: 549900,
    subcategory: { id: 4, name: 'Tenis' },
    category: { id: 1, name: 'Calzado' }
  },
  {
    id: 5,
    name: 'Camiseta Seleccion Colombia 2024',
    description: 'Camiseta oficial de la seleccion Colombia - Version titular',
    url_image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    price: 299900,
    subcategory: { id: 5, name: 'Camisetas' },
    category: { id: 2, name: 'Ropa Deportiva' }
  },
  {
    id: 6,
    name: 'Pantalon Adidas Tiro 23',
    description: 'Pantalon de entrenamiento con tecnologia Aeroready',
    url_image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
    price: 199900,
    subcategory: { id: 6, name: 'Pantalones' },
    category: { id: 2, name: 'Ropa Deportiva' }
  },
  {
    id: 7,
    name: 'Short Nike Dri-FIT',
    description: 'Short deportivo con tecnologia de secado rapido',
    url_image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
    price: 129900,
    subcategory: { id: 7, name: 'Shorts' },
    category: { id: 2, name: 'Ropa Deportiva' }
  },
  {
    id: 8,
    name: 'Chaqueta Puma Evostripe',
    description: 'Chaqueta deportiva con capucha y bolsillos laterales',
    url_image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    price: 249900,
    subcategory: { id: 8, name: 'Chaquetas' },
    category: { id: 2, name: 'Ropa Deportiva' }
  },
  {
    id: 9,
    name: 'Balon Nike Strike',
    description: 'Balon de futbol profesional - Tecnologia Aerowsculpt',
    url_image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400',
    price: 149900,
    subcategory: { id: 9, name: 'Balones' },
    category: { id: 3, name: 'Accesorios' }
  },
  {
    id: 10,
    name: 'Mochila Deportiva Adidas',
    description: 'Mochila con compartimento para laptop y calzado',
    url_image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    price: 179900,
    subcategory: { id: 10, name: 'Mochilas' },
    category: { id: 3, name: 'Accesorios' }
  },
  {
    id: 11,
    name: 'Guantes de Portero Predator',
    description: 'Guantes profesionales con tecnologia Grippy Latex',
    url_image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
    price: 229900,
    subcategory: { id: 11, name: 'Guantes' },
    category: { id: 3, name: 'Accesorios' }
  },
  {
    id: 12,
    name: 'Gorra Nike Dri-FIT',
    description: 'Gorra deportiva con proteccion UV',
    url_image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
    price: 79900,
    subcategory: { id: 12, name: 'Gorras' },
    category: { id: 3, name: 'Accesorios' }
  }
];

const useProducts = (filters, currentPage) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('[useProducts] Intentando obtener productos del backend...');
      console.log('[useProducts] Filtros:', filters);

      const params = new URLSearchParams();
      if (filters.categoryId) params.append('id_category', filters.categoryId);
      if (filters.subcategoryId) params.append('id_sub_category', filters.subcategoryId);
      params.append('page', currentPage);
      params.append('limit', 10);

      const url = `${import.meta.env.VITE_API_URL}/api/product/getAllProducts?${params.toString()}`;
      console.log('[useProducts] URL:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('[useProducts] Backend no devolvio JSON valido');
        throw new Error('Respuesta del servidor no es JSON');
      }

      const text = await response.text();
      
      if (!text || text.trim().length === 0) {
        console.warn('[useProducts] Backend devolvio respuesta vacia');
        throw new Error('Respuesta vacia del servidor');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('[useProducts] Error al parsear JSON:', text);
        throw new Error('Respuesta del servidor no es JSON valido');
      }

      console.log('[useProducts] Respuesta del backend:', data);

      let isValidData = false;
      let formattedProducts = [];

      if (Array.isArray(data) && data.length > 0) {
        formattedProducts = data.map(prod => ({
          id: prod.id_product || prod.id,
          name: prod.product_name || prod.name,
          description: prod.description || '',
          url_image: prod.url_image || '/placeholder-product.png',
          price: prod.price || 0,
          subcategory: {
            id: prod.id_sub_category,
            name: prod.sub_category_name,
          },
          category: {
            id: prod.id_category,
            name: prod.category_name,
          },
        }));
        isValidData = true;
      } else if (data.success && Array.isArray(data.data) && data.length > 0) {
        formattedProducts = data.data.map(prod => ({
          id: prod.id_product || prod.id,
          name: prod.product_name || prod.name,
          description: prod.description || '',
          url_image: prod.url_image || '/placeholder-product.png',
          price: prod.price || 0,
          subcategory: {
            id: prod.id_sub_category,
            name: prod.sub_category_name,
          },
          category: {
            id: prod.id_category,
            name: prod.category_name,
          },
        }));
        isValidData = true;
      }

      if (isValidData) {
        setProducts(formattedProducts);
        setTotalProducts(data.totalProducts || formattedProducts.length);
        setTotalPages(data.totalPages || Math.ceil(formattedProducts.length / 20));
        console.log(`[useProducts] ${formattedProducts.length} productos del BACKEND`);
      } else {
        console.warn('[useProducts] Backend devolvio datos invalidos, usando MOCK');
        useMockProducts();
      }
    } catch (err) {
      console.error('[useProducts] Error:', err.message);
      console.warn('[useProducts] Usando datos MOCK por error');
      useMockProducts();
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const useMockProducts = () => {
    let filteredProducts = [...MOCK_PRODUCTS];

    if (filters.categoryId) {
      filteredProducts = filteredProducts.filter(
        p => p.category.id === parseInt(filters.categoryId)
      );
    }

    if (filters.subcategoryId) {
      filteredProducts = filteredProducts.filter(
        p => p.subcategory.id === parseInt(filters.subcategoryId)
      );
    }

    const itemsPerPage = 20;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    setProducts(paginatedProducts);
    setTotalProducts(filteredProducts.length);
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));

    console.log(`[useProducts] ${paginatedProducts.length} productos MOCK (${filteredProducts.length} total despues de filtros)`);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters.categoryId, filters.subcategoryId, currentPage]);

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