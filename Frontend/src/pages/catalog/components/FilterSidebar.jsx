import React from 'react';
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';
import './FilterSidebar.css';

/**
 * Sidebar(barra lateral) de filtros con categorías y subcategorías
 */
const FilterSidebar = ({
  isOpen,
  categories,
  loading,
  error,
  filters,
  openedCategories,
  onClose,
  onCategoryClick,
  onSubCategoryClick,
  onToggleCategoryExpansion,
  onClearFilters,
}) => {
  // Se mantiene esta función porque mejora la experiencia de usuario:
  // al hacer clic en una categoría, también se expande si estaba cerrada.
  const handleCategoryClick = categoryId => {
    onCategoryClick(categoryId);

    if (!openedCategories[categoryId]) {
      onToggleCategoryExpansion(categoryId);
    }
  };

  return (
    <>
      <aside className={`catalog-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Filtros</h2>
          <button
            className="close-filter-btn"
            onClick={onClose}
            aria-label="Cerrar filtros"
          >
            <FaTimes />
          </button>
        </div>

        <div className="filter-categories">
          <div className="filter-header">
            <h3>Categorías</h3>
            {(filters.categoryId || filters.subcategoryId) && (
              <button className="clear-filters-btn" onClick={onClearFilters}>
                Limpiar
              </button>
            )}
          </div>

          {loading ? (
            <LoadingSpinner message="Cargando filtros..." />
          ) : error ? (
            <p className="filter-error">{error}</p>
          ) : categories.length === 0 ? (
            <p className="no-categories-text">No hay categorías disponibles</p>
          ) : (
            categories.map(category => (
              <div key={`category-${category.id}`} className="filter-category">
                <button
                  className={`category-button ${
                    filters.categoryId === category.id ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="category-name">{category.name}</span>
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <span
                        className="category-toggle"
                        onClick={e => {
                          e.stopPropagation(); // Evita que el clic en la flecha también filtre
                          onToggleCategoryExpansion(category.id);
                        }}
                      >
                        {openedCategories[category.id] ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    )}
                </button>

                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <div
                      className={`subcategories ${
                        openedCategories[category.id] ? 'open' : ''
                      }`}
                    >
                      
                      {category.subcategories.map(sub => (
                        <button
                          key={`subcategory-${sub.name}`}
                          className={`subcategory-button ${
                            filters.subcategoryId === sub.id ? 'active' : ''
                          }`}
                          onClick={() => onSubCategoryClick(sub.id)}
                        >
                          <span>{sub.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Overlay para móvil */}
      {isOpen && <div className="filter-overlay" onClick={onClose}></div>}
    </>
  );
};

export default FilterSidebar;