import { useState, useMemo } from 'react';

/**
 * Hook para manejar el estado de filtros del catálogo
 */
const useFilters = () => {
  // Estado de filtros activos
  const [filters, setFilters] = useState({
    categoryId: null,
    subcategoryId: null,
  });

  // Estado de categorías expandidas en el sidebar
  const [openedCategories, setOpenedCategories] = useState({});

  /**
   * Alternar categoría (seleccionar/deseleccionar)
   */
  const toggleCategory = categoryId => {
    if (!categoryId) return;

    const numericId =
      typeof categoryId === 'string' ? parseInt(categoryId) : categoryId;

    setFilters(prev => ({
      categoryId: prev.categoryId === numericId ? null : numericId,
      subcategoryId: null,
    }));
  };

  /**
   * Alternar subcategoría (seleccionar/deseleccionar)
   */
  const toggleSubCategory = subcategoryId => {
    if (!subcategoryId) return;

    const numericId =
      typeof subcategoryId === 'string'
        ? parseInt(subcategoryId)
        : subcategoryId;

    setFilters(prev => ({
      ...prev,
      subcategoryId: prev.subcategoryId === numericId ? null : numericId,
    }));
  };

  /**
   * Actualizar filtros completos
   */
  const updateFilters = newFilters => {
    setFilters({
      categoryId: newFilters?.categoryId
        ? parseInt(newFilters.categoryId)
        : null,
      subcategoryId: newFilters?.subcategoryId
        ? parseInt(newFilters.subcategoryId)
        : null,
    });
  };

  /**
   * Limpiar todos los filtros
   */
  const clearFilters = () => {
    setFilters({
      categoryId: null,
      subcategoryId: null,
    });
  };

  /**
   * Alternar expansión de categoría en el sidebar
   */
  const toggleCategoryExpansion = categoryId => {
    if (!categoryId) return;

    const numericId =
      typeof categoryId === 'string' ? parseInt(categoryId) : categoryId;

    setOpenedCategories(prev => ({
      ...prev,
      [numericId]: !prev[numericId],
    }));
  };

  /**
   * Calcular filtros activos (para mostrar chips/tags)
   */
  const activeFilters = useMemo(() => {
    const active = [];

    if (filters.categoryId) {
      active.push({
        type: 'category',
        id: filters.categoryId,
        label: `Categoría: ${filters.categoryId}`,
      });
    }

    if (filters.subcategoryId) {
      active.push({
        type: 'subcategory',
        id: filters.subcategoryId,
        label: `Subcategoría: ${filters.subcategoryId}`,
      });
    }

    return active;
  }, [filters]);

  return {
    filters,
    activeFilters,
    openedCategories,
    toggleCategory,
    toggleSubCategory,
    updateFilters,
    clearFilters,
    toggleCategoryExpansion,
  };
};

export default useFilters;
