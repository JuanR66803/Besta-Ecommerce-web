import { useEffect, useState } from "react";

export const useSubcategories = (apiUrlBase) => {
  const GET_SUBCATEGORIES_URL = `${apiUrlBase}/api/subCategory/getAllSubCategories`;
  const [subcategories, setSubcategories] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(true);

  // Función para cargar las subcategorías (puede ser llamada manualmente)
  const fetchSubcategories = async () => {
    setLoadingSubcategories(true);
    try {
      const res = await fetch(GET_SUBCATEGORIES_URL);
      if (!res.ok) throw new Error("Error al obtener las subcategorías");
      const data = await res.json();

      // Manejar distintos formatos de respuesta
      setSubcategories(data.subcategories || data || []);
    } catch (err) {
      console.error("Error al cargar subcategorías:", err);
      alert("No se pudieron cargar las subcategorías");
    } finally {
      setLoadingSubcategories(false);
    }
  };

  // Efecto inicial para cargar las subcategorías
  useEffect(() => {
    fetchSubcategories();
  }, [GET_SUBCATEGORIES_URL]);

  return { subcategories, setSubcategories, loadingSubcategories, fetchSubcategories };
};
