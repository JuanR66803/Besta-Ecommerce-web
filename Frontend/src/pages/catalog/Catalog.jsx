import { useState } from 'react';
import './Catalog.css';
import CatalogBanner from './components/CatalogBanner';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import ActiveFilters from './components/ActiveFilters';
import Pagination from './components/Pagination';
import ProductModal from './components/ProductModal';
import useFilters from './hooks/useFilters';
import useProducts from './hooks/useProducts';
import useCategories from './hooks/useCategories';
import { FaFilter } from 'react-icons/fa';

const Catalog = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks personalizados
  const {
    filters,
    activeFilters,
    openedCategories,
    toggleCategory,
    toggleSubCategory,
    updateFilters,
    clearFilters,
    toggleCategoryExpansion,
  } = useFilters();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const { products, loading, error, totalPages, totalProducts } = useProducts(
    filters,
    currentPage
  );

  // Funciones auxiliares
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleCategoryClick = categoryId => {
    toggleCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSubCategoryClick = subcategoryId => {
    toggleSubCategory(subcategoryId);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    clearFilters();
    setCurrentPage(1);
  };

  // Funciones para obtener nombres (para ActiveFilters)
  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : `Categoría ${categoryId}`;
  };

  const getSubCategoryName = subcategoryId => {
    for (const category of categories) {
      const subcategory = category.subcategories?.find(
        sub => sub.id === subcategoryId
      );
      if (subcategory) return subcategory.name;
    }
    return `Subcategoría ${subcategoryId}`;
  };

  const handleRemoveCategory = () => {
    updateFilters({ categoryId: null, subcategoryId: null });
    setCurrentPage(1);
  };

  const handleRemoveSubCategory = () => {
    updateFilters({ ...filters, subcategoryId: null });
    setCurrentPage(1);
  };

  return (
    <div className="catalog-page">
      <CatalogBanner />

      <div className="catalog-container">
        {/* Sidebar de filtros */}
        <FilterSidebar
          isOpen={isSidebarOpen}
          categories={categories}
          loading={categoriesLoading}
          error={categoriesError}
          filters={filters}
          openedCategories={openedCategories}
          onClose={toggleSidebar}
          onCategoryClick={handleCategoryClick}
          onSubCategoryClick={handleSubCategoryClick}
          onToggleCategoryExpansion={toggleCategoryExpansion}
          onClearFilters={handleClearFilters}
        />

        {/* Contenido principal */}
        <main className="catalog-main">
          {/* Header con botón de filtros móvil */}
          <div className="catalog-header">
            <button className="mobile-filter-btn" onClick={toggleSidebar}>
              <FaFilter />
              <span>Filtros</span>
            </button>

            <div className="catalog-results">
              {loading ? (
                <p>Cargando productos...</p>
              ) : (
                <p>
                  {totalProducts}{' '}
                  {totalProducts === 1 ? 'producto' : 'productos'}{' '}
                  {activeFilters.length > 0 && 'filtrados'}
                </p>
              )}
            </div>
          </div>

          {/* Filtros activos */}
          <ActiveFilters
            filters={filters}
            getCategoryName={getCategoryName}
            getSubCategoryName={getSubCategoryName}
            onRemoveCategory={handleRemoveCategory}
            onRemoveSubCategory={handleRemoveSubCategory}
          />

          {/* Mensaje de error */}
          {error && (
            <div className="catalog-error">
              <p>⚠️ Error al cargar productos: {error}</p>
              <button onClick={() => window.location.reload()}>
                Reintentar
              </button>
            </div>
          )}

          {/* Grid de productos */}
          <ProductGrid
            products={products}
            loading={loading}
            onProductClick={handleProductClick}
          />

          {/* Paginación */}
          {!loading && products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>

      {/* Modal de detalles del producto */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Overlay del sidebar móvil */}
      {isSidebarOpen && (
        <div className="filter-overlay" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Catalog;
