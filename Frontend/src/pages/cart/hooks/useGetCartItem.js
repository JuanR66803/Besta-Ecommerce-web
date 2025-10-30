// src/hooks/useGetCartItems.js
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';

export const useGetCartItems = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCartItems = async () => {
    if (!user || !user.id_users) {
      setError('Debes iniciar sesión para ver tu carrito');
      return [];
    }

    try {
      console.log('🟢 Enviando al backend:', { id_user: user.id_users });
      setLoading(true);
      const baseURL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseURL}/api/shoppingCar/getCar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_user: user.id_users }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al obtener los productos del carrito');

      return data;
    } catch (err) {
      console.error("Error en getCartItems:", err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { getCartItems, loading, error };
};
