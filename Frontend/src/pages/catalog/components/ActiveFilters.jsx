import React from 'react';
import './ActiveFilters.css';

// Este componente es para mostrar los filtros activos en la página de catálogo.
const ActiveFilters = ({ 
  filters, 
  getCategoryName, 
  getSubCategoryName,
  onRemoveCategory,
  onRemoveSubCategory
}) => {
  // No mostrar si no hay filtros activos
  if (!filters.categoryId && !filters.subcategoryId) {
    return null;
  }

  return (
    <div className="active-filters">
      <h3>Filtros activos:</h3>
      <div className="filter-tags">
        {filters.categoryId && (
          <span className="filter-tag">
            <span className="filter-tag-icon"></span>
            <span className="filter-tag-text">{getCategoryName(filters.categoryId)}</span>
            <button 
              className="filter-tag-remove"
              onClick={onRemoveCategory}
              aria-label="Eliminar filtro de categoría"
            >
              ×
            </button>
          </span>
        )}
        
        {filters.subcategoryId && (
          <span className="filter-tag">
            <span className="filter-tag-icon">🔖</span>
            <span className="filter-tag-text">{getSubCategoryName(filters.subcategoryId)}</span>
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