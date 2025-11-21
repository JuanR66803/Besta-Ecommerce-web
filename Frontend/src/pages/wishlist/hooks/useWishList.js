import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

/**
 * Hook personalizado para gestionar la lista de deseos
 * Maneja el estado global de la wishlist y las operaciones CRUD
 */
export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  const baseURL = import.meta.env.VITE_API_URL;

  /**
   * Obtener la wishlist completa del usuario
   */
  const fetchWishlist = useCallback(async () => {
    if (!user?.id_users) {
      setWishlist([]);
      setWishlistCount(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseURL}/api/wishListProduct/${user.id_users}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Formatear productos con la misma estructura del catálogo
        const formattedWishlist = data.data.map(item => ({
          id: item.id_product_details,
          wishlistId: item.id_wish_list_product,
          name: item.product_name,
          description: item.description,
          url_image: item.url_image || '/placeholder-product.png',
          price: Number(item.product_price) || 0,
          sizes: item.product_size ? [item.product_size] : [],
          colors: [],
          total_stock: Number(item.stock) || 0,
          category: {
            id: item.id_category,
            name: item.category_name,
          },
          subcategory: {
            id: item.id_sub_category,
            name: item.sub_category_name,
          },
        }));

        setWishlist(formattedWishlist);
        setWishlistCount(formattedWishlist.length);
      } else {
        throw new Error(data.message || 'Error al cargar la wishlist');
      }
    } catch (err) {
      console.error('[useWishlist] Error:', err);
      setError(err.message);
      // No mostrar toast aquí para evitar notificaciones al cargar
    } finally {
      setLoading(false);
    }
  }, [user, baseURL]);

  /**
   * Agregar un producto a la wishlist
   */
  const addToWishlist = async (productId) => {
    if (!user?.id_users) {
      toast.error('Debes iniciar sesión para agregar a favoritos');
      return false;
    }

    try {
      const response = await fetch(`${baseURL}/api/wishListProduct/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_users: user.id_users,
          id_product_details: productId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error al agregar a favoritos');
      }

      // Recargar la wishlist
      await fetchWishlist();
      return true;
    } catch (err) {
      console.error('[useWishlist] Error al agregar:', err);
      toast.error(err.message);
      return false;
    }
  };

  /**
   * Eliminar un producto de la wishlist
   */
  const removeFromWishlist = async (productId) => {
    if (!user?.id_users) {
      return false;
    }

    try {
      const response = await fetch(`${baseURL}/api/wishListProduct/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_users: user.id_users,
          id_product_details: productId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error al eliminar de favoritos');
      }

      // Recargar la wishlist
      await fetchWishlist();
      return true;
    } catch (err) {
      console.error('[useWishlist] Error al eliminar:', err);
      toast.error(err.message);
      return false;
    }
  };

  /**
   * Verificar si un producto está en la wishlist (LOCAL)
   */
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  /**
   * Toggle: añadir o quitar de la wishlist
   */
  const toggleWishlist = async (productId) => {
    if (isInWishlist(productId)) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  };

  // Cargar wishlist al montar el componente
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return {
    wishlist,
    loading,
    error,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    refetch: fetchWishlist,
  };
};