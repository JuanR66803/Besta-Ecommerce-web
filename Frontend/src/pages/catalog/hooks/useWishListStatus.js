import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

/**
 * Hook para verificar si UN producto específico está en la wishlist
 * Usado en el modal para mostrar el estado del corazón
 * SOLUCIÓN AL PUNTO 1: Detectar si ya está añadido
 */
export const useWishlistStatus = (productId) => {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user?.id_users || !productId) {
        setIsInWishlist(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${baseURL}/api/wishListProduct/check/${user.id_users}/${productId}`
        );

        if (!response.ok) {
          throw new Error('Error al verificar wishlist');
        }

        const data = await response.json();
        setIsInWishlist(data.isInWishList || false);
      } catch (error) {
        console.error('[useWishlistStatus] Error:', error);
        setIsInWishlist(false);
      } finally {
        setLoading(false);
      }
    };

    checkWishlistStatus();
  }, [productId, user, baseURL]);

  return { isInWishlist, setIsInWishlist, loading };
};