import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import './Catalog.css';
import ProductModal from './components/ProductModal';
// ❌ ELIMINADO: import useProducts from './hooks/useProducts';
// ✅ AÑADIDO: Nuevo hook para el catálogo
import { useProductsCatalog } from './hooks/useProductsCatalog';
import useCategories from './hooks/useCategories';
import useFilters from './hooks/useFilters';
import FilterSidebar from './components/FilterSidebar';
import ActiveFilters from './components/ActiveFilters';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const useResponsiveItemsPerPage = () => {
  const getItems = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 12;
    if (width >= 992) return 12;
    if (width >= 768) return 9;
    return 8;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItems());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItems());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return itemsPerPage;
};

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');
  const searchTerm = searchParams.get('search') || '';

  const urlFilters = useMemo(
    () => ({
      categoryId: categoryId ? parseInt(categoryId) : null,
      subcategoryId: subcategoryId ? parseInt(subcategoryId) : null,
      search: searchTerm,
    }),
    [categoryId, subcategoryId, searchTerm]
  );

  const itemsPerPage = useResponsiveItemsPerPage();

  const { openedCategories, toggleCategoryExpansion } = useFilters();

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  // Usar elhook de useProductscatalog
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
    totalPages,
    totalProducts,
  } = useProductsCatalog(currentPage, itemsPerPage);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);

  const handleCategoryClick = categoryId => {
    window.dispatchEvent(new Event('clearSearch'));
    setSearchParams({ category: categoryId.toString() }, { replace: true });
    setCurrentPage(1);
  };

  const handleSubCategoryClick = subcategoryId => {
    const parentCategory = categories.find(cat =>
      cat.subcategories?.some(sub => sub.id_sub_category === subcategoryId)
    );
    window.dispatchEvent(new Event('clearSearch'));

    const params = {};
    if (parentCategory) {
      params.category = parentCategory.id.toString();
    }
    params.subcategory = subcategoryId.toString();

    setSearchParams(params, { replace: true });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchParams({}, { replace: true });
    setCurrentPage(1);
  };

  const handleRemoveCategory = () => {
    const params = Object.fromEntries(searchParams.entries());
    delete params.category;
    delete params.subcategory;
    setSearchParams(params, { replace: true });
    setCurrentPage(1);
  };

  const handleRemoveSubCategory = () => {
    const params = Object.fromEntries(searchParams.entries());
    delete params.subcategory;
    setSearchParams(params, { replace: true });
    setCurrentPage(1);
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
    setSelectedProduct(null);
  };

  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.id == categoryId);
    return category?.name || 'Categoría';
  };

  const getSubCategoryName = subcategoryId => {
    for (const category of categories) {
      if (category.subcategories) {
        const subcategory = category.subcategories.find(
          sub => sub.id_sub_category == subcategoryId
        );
        if (subcategory) return subcategory.sub_category_name;
      }
    }
    return 'Subcategoría';
  };

  return (
    <div className="catalog-container">
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
          filters={urlFilters}
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
            filters={urlFilters}
            loading={loadingCategories} // <-- Añade esto
            getCategoryName={getCategoryName}
            getSubCategoryName={getSubCategoryName}
            onRemoveCategory={handleRemoveCategory}
            onRemoveSubCategory={handleRemoveSubCategory}
            onClearAll={handleClearFilters} // <-- Añade esto
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
            hasFilters={!!(urlFilters.categoryId || urlFilters.subcategoryId)}
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

          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </main>
      </div>
    </div>
  );
};

export default Catalog;
