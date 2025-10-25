import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const useProducts = (filters, currentPage, itemsPerPage = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('[useProducts] Obteniendo productos...');
        console.log('[useProducts] Filtros:', filters);
        console.log('[useProducts] Página:', currentPage);

        const params = new URLSearchParams();
        params.append('page', currentPage);
        params.append('limit', itemsPerPage);

        if (filters?.categoryId) {
          params.append('id_category', filters.categoryId);
        }

        if (filters?.subcategoryId) {
          params.append('id_sub_category', filters.subcategoryId);
        }

        const url = `${API_URL}/api/productDetails/getAllProductDetails?${params.toString()}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!Array.isArray(data)) {
          throw new Error('La respuesta del servidor no es un array');
        }

        const groupedProducts = groupProductsByVariant(data);
        console.log('[useProducts] Productos agrupados:', groupedProducts);

        setProducts(groupedProducts);
        setTotalProducts(groupedProducts.length);
        setTotalPages(Math.ceil(groupedProducts.length / itemsPerPage) || 1);

        console.log(
          `[useProducts] ${groupedProducts.length} productos mostrados de ${data.length} totales`
        );
      } catch (err) {
        console.error('[useProducts] Error:', err);
        setError(err.message);
        setProducts([]);
        setTotalProducts(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage, itemsPerPage]);

  return { products, loading, error, totalPages, totalProducts };
};

const groupProductsByVariant = rawProducts => {
  if (!rawProducts || rawProducts.length === 0) {
    return [];
  }

  const productsMap = new Map();

  // Paso 1: Agrupar productos y recolectar variantes y colores
  rawProducts.forEach(item => {
    const productId = item.id_product;

    if (!productsMap.has(productId)) {
      productsMap.set(productId, {
        id: productId,
        id_product_details: item.id_product_details,
        name: item.product_name,
        price: item.product_price,
        image: item.url_image,
        description: item.description,
        category: item.category_name,
        categoryId: item.id_category,
        subcategory: item.sub_category_name,
        subcategoryId: item.id_sub_category,
        stock: 0,
        // ✅ LÍNEA AÑADIDA: Restaura la talla de la primera variante encontrada
        size: item.product_size,
        uniqueColors: new Set(),
        variants: [],
      });
    }

    const product = productsMap.get(productId);

    // Añadir la variante actual
    product.variants.push({
      id: item.id_product_details,
      size: item.product_size,
      color: item.colors,
      stock: item.stock,
      price: item.product_price,
      publicObjective: item.public_objetive,
      expertice: item.expertice,
    });

    // Sumar el stock
    product.stock += item.stock;

    // Añadir el color al Set si existe
    if (item.colors) {
      product.uniqueColors.add(item.colors);
    }
  });

  // Paso 2: Convertir el Map a un Array y formatear los colores
  const groupedProducts = Array.from(productsMap.values());

  groupedProducts.forEach(product => {
    product.colors = Array.from(product.uniqueColors).join(',');
    delete product.uniqueColors;
  });

  return groupedProducts;
};

export default useProducts;
