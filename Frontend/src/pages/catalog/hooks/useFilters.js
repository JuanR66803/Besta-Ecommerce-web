import { useState } from 'react';


 //Hook para manejar el estado de filtros del catálogo
 
 
const useFilters = () => {
  // Estado de filtros activos
  const [filters, setFilters] = useState({
    categoryId: null,
    subcategoryId: null
  });

  // Estado de categorías expandidas en el sidebar
  const [openedCategories, setOpenedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setFilters(prev => ({
      categoryId: prev.categoryId === categoryId ? null : categoryId,
      subcategoryId: null // Resetear subcategoría al cambiar categoría
    }));
  };

  const toggleSubCategory = (subcategoryId) => {
    setFilters(prev => ({
      ...prev,
      subcategoryId: prev.subcategoryId === subcategoryId ? null : subcategoryId
    }));
  };

  /**
   * Limpiar todos los filtros
   */
  const clearFilters = () => {
    setFilters({
      categoryId: null,
      subcategoryId: null
    });
  };

  // Alternar expansión de categoría en el sidebar
  const toggleCategoryExpansion = (categoryId) => {
    setOpenedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return {
    filters,
    openedCategories,
    toggleCategory,
    toggleSubCategory,
    clearFilters,
    toggleCategoryExpansion
  };
};

export default useFilters;