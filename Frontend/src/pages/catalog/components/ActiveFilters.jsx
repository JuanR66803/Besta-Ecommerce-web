import React from 'react';
import './ActiveFilters.css';

const ActiveFilters = ({
  filters,
  loading, // <-- Prop nueva
  getCategoryName,
  getSubCategoryName,
  onRemoveCategory,
  onRemoveSubCategory,
  onClearAll // <-- Prop nueva
}) => {
  const hasCategory = !!filters.categoryId;
  const hasSubcategory = !!filters.subcategoryId;

  // No mostrar si no hay filtros activos
  if (!hasCategory && !hasSubcategory) {
    return null;
  }

  // Función para mostrar el nombre o "Cargando..."
  const getLabel = (type, id) => {
    if (loading) return "Cargando...";
    if (type === 'category') return getCategoryName(id);
    if (type === 'subcategory') return getSubCategoryName(id);
  };

  return (
    <div className="active-filters">
      <div className="filter-tags">
        {hasCategory && (
          <span className="filter-tag">
            <span className="filter-tag-text">{getLabel('category', filters.categoryId)}</span>
            <button
              className="filter-tag-remove"
              onClick={onRemoveCategory}
              aria-label="Eliminar filtro de categoría"
            >
              ×
            </button>
          </span>
        )}

        {hasSubcategory && (
          <span className="filter-tag">
            <span className="filter-tag-text">{getLabel('subcategory', filters.subcategoryId)}</span>
            <button
              className="filter-tag-remove"
              onClick={onRemoveSubCategory}
              aria-label="Eliminar filtro de subcategoría"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;