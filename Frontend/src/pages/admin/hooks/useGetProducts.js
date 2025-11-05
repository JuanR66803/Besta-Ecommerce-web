// src/hooks/useGetCartItems.js
import { useState } from 'react';


export const useGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]); // Inicializa como arreglo vacío

  const getProducts = async () => {
    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseURL}/api/productDetails/getAllProductDetails`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Inspecciona la respuesta

      if (!response.ok) throw new Error(data.message || 'Error al obtener los productos');

      if (Array.isArray(data)) {
        setProducts(data); // Actualiza solo si la respuesta es un arreglo
      } else {
        throw new Error('La respuesta del servidor no es un arreglo');
      }
      return data;
    } catch (err) {
      console.error("Error en getProducts:", err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { getProducts, products, loading, error };
};