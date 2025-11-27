import { useState, useCallback } from 'react'; // <--- Importa useCallback

export const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]); 
  const baseURL = import.meta.env.VITE_API_URL;

  // 1. Envolver la función en useCallback
  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${baseURL}/api/user/getAllUsers`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data); 

      if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los usuarios');
      }

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        // En caso de que el servidor devuelva un objeto con los datos, ajusta esto:
        // Por ejemplo, si el servidor responde { users: [...] }
        if (data && Array.isArray(data.users)) {
            setUsers(data.users);
        } else {
            throw new Error('La respuesta del servidor no contiene un arreglo de usuarios');
        }
      }
      return data;
    } catch (err) {
      console.error("Error en getUsers:", err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseURL]); // <--- Dependencias: Solo `baseURL` si sabes que no cambiará, o dejarlo vacío `[]`

  return { getUsers, users, loading, error };
};