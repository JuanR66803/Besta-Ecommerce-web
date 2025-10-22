import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import './Catalog.css';

// Importar hooks personalizados
import useProducts from './hooks/useProducts';
import useCategories from './hooks/useCategories';
import useFilters from './hooks/useFilters';

// Importar componentes
import CatalogBanner from './components/CatalogBanner';
import FilterSidebar from './components/FilterSidebar';
import ActiveFilters from './components/ActiveFilters';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

/**
 * Componente principal del catálogo de productos
 * Maneja la visualización de productos, filtros y paginación
 */
const Catalog = () => {
  // ==========================================
  // ESTADO LOCAL
  // ==========================================
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ==========================================
  // HOOKS PERSONALIZADOS
  // ==========================================

  // Hook para manejar filtros
  const {
    filters,
    openedCategories,
    toggleCategory,
    toggleSubCategory,
    clearFilters,
    toggleCategoryExpansion,
  } = useFilters();

  // Hook para obtener categorías
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  // Hook para obtener productos (depende de filtros y página actual)
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
    totalPages,
    totalProducts,
  } = useProducts(filters, currentPage);

  // ==========================================
  // MANEJADORES DE EVENTOS
  // ==========================================

  /**
   * Abrir/cerrar sidebar de filtros (móvil)
   */
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);

  /**
   * Manejar clic en categoría
   * Aplica el filtro de categoría y resetea la página a 1
   */
  const handleCategoryClick = categoryId => {
    toggleCategory(categoryId);
    setCurrentPage(1); // Resetear a página 1 al cambiar filtro
  };

  /**
   * Manejar clic en subcategoría
   * Aplica el filtro de subcategoría y resetea la página a 1
   */
  const handleSubCategoryClick = subcategoryId => {
    toggleSubCategory(subcategoryId);
    setCurrentPage(1); // Resetear a página 1 al cambiar filtro
  };

  /**
   * Limpiar todos los filtros activos
   */
  const handleClearFilters = () => {
    clearFilters();
    setCurrentPage(1);
  };

  /**
   * Remover filtro de categoría
   */
  const handleRemoveCategory = () => {
    toggleCategory(filters.categoryId);
    setCurrentPage(1);
  };

  /**
   * Remover filtro de subcategoría
   */
  const handleRemoveSubCategory = () => {
    toggleSubCategory(filters.subcategoryId);
    setCurrentPage(1);
  };

  /**
   * Cambiar de página
   */
  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Manejar clic en producto (para futuras funcionalidades)
   */
  const handleProductClick = product => {
    console.log('Producto seleccionado:', product);
    // TODO: Navegar a página de detalle del producto
    // navigate(`/product/${product.id}`);
  };

  // ==========================================
  // FUNCIONES AUXILIARES
  // ==========================================

  /**
   * Obtener nombre de categoría por ID
   */
  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Categoría';
  };

  /**
   * Obtener nombre de subcategoría por ID
   */
  const getSubCategoryName = subcategoryId => {
    for (const category of categories) {
      if (category.subcategories) {
        const subcategory = category.subcategories.find(
          sub => sub.id === subcategoryId
        );
        if (subcategory) return subcategory.name;
      }
    }
    return 'Subcategoría';
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="catalog-container">
      {/* Banner principal */}
      <CatalogBanner
        title="Catálogo de Productos Deportivos"
        subtitle="Encuentra el equipamiento perfecto para tu deporte"
      />

      {/* Botón de filtros para móvil */}
      <div className="mobile-filters">
        <button
          className="filter-mobile-btn"
          onClick={toggleFilter}
          aria-label="Abrir filtros"
        >
          <FaFilter />
          <span>Filtros</span>
        </button>
      </div>

      {/* Layout principal: Sidebar + Contenido */}
      <div className="catalog-layout">
        {/* Sidebar de filtros */}
        <FilterSidebar
          isOpen={isFilterOpen}
          categories={categories}
          loading={loadingCategories}
          error={errorCategories}
          filters={filters}
          openedCategories={openedCategories}
          onClose={closeFilter}
          onCategoryClick={handleCategoryClick}
          onSubCategoryClick={handleSubCategoryClick}
          onToggleCategoryExpansion={toggleCategoryExpansion}
          onClearFilters={handleClearFilters}
        />

        {/* Área principal de productos */}
        <main className="catalog-main">
          {/* Mostrar filtros activos */}
          <ActiveFilters
            filters={filters}
            getCategoryName={getCategoryName}
            getSubCategoryName={getSubCategoryName}
            onRemoveCategory={handleRemoveCategory}
            onRemoveSubCategory={handleRemoveSubCategory}
          />

          {/* Resumen de productos */}
          {!loadingProducts && products.length > 0 && (
            <p className="products-summary">
              Mostrando {products.length} de {totalProducts} productos
            </p>
          )}

          {/* Manejo de errores */}
          {errorProducts && (
            <div className="error-message">
              <p>Error al cargar productos: {errorProducts}</p>
              <button onClick={() => window.location.reload()}>
                Reintentar
              </button>
            </div>
          )}

          {/* Grid de productos */}
          <ProductGrid
            products={products}
            loading={loadingProducts}
            hasFilters={!!(filters.categoryId || filters.subcategoryId)}
            onProductClick={handleProductClick}
          />

          {/* Paginación */}
          {!loadingProducts && products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Catalog;
