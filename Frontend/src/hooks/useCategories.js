import { useEffect, useState } from "react";

export const useCategories = (apiUrlBase) => {
  const GET_ALL_CATEGORIES_URL = `${apiUrlBase}/api/Category/getAllCategories`;
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(GET_ALL_CATEGORIES_URL);
        if (!res.ok) throw new Error("Error al obtener las categorías");
        const data = await res.json();
        setCategories(data.categories || data || []);
      } catch (err) {
        console.error(err);
        alert("No se pudieron cargar las categorías");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [GET_ALL_CATEGORIES_URL]);

  return { categories, loadingCategories };
};
