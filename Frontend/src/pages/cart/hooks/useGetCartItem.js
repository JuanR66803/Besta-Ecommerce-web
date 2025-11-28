// src/hooks/useGetCartItems.js
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';

export const useGetCartItems = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseURL = import.meta.env.VITE_API_URL;

  const getCartItems = async () => {
    if (!user || !user.id_users) {
      setError('Debes iniciar sesión para ver tu carrito');
      return [];
    }

    try {
      setLoading(true);
      console.log("Usuario logueado:", user);
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
  const deleteCartItem = async (id_cart_item) => {
    if (!user || !user.id_users) {
      setError('Debes iniciar sesión para modificar el carrito');
      return false;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/api/shoppingCar/deleteItem/${id_cart_item}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_cart_item, id_user: user.id_users }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al eliminar producto del carrito');
      return true;
    } catch (err) {
      console.error('❌ Error eliminando producto del carrito:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const updateCartItemQuantity = async (id_shopping_cart_item, quantity) => {
    if (!user || !user.id_users) {
      setError('Debes iniciar sesión para modificar el carrito');
      return false;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/api/shoppingCar/updateQuantity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_shopping_cart_item, quantity, id_user: user.id_users }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al actualizar cantidad del producto');
      return true;
    } catch (err) {
      console.error('❌ Error actualizando cantidad del carrito:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCartItem,updateCartItemQuantity,getCartItems, loading, error };
};
