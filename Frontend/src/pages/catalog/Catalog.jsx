import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useEffect } from 'react';
import './Catalog.css';
import ProductModal from './components/ProductModal';
import useProducts from './hooks/useProducts';
import useCategories from './hooks/useCategories';
import useFilters from './hooks/useFilters';
import FilterSidebar from './components/FilterSidebar';
import ActiveFilters from './components/ActiveFilters';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const Catalog = () => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);

  const handleCategoryClick = categoryId => {
    toggleCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSubCategoryClick = (subcategoryId) => {
    // Buscar la categoría padre usando la propiedad correcta
    const parentCategory = categories.find(cat =>
      cat.subcategories?.some(sub => sub.id_sub_category === subcategoryId)
    );

    if (parentCategory) {
      if (filters.categoryId !== parentCategory.id) {
        toggleCategory(parentCategory.id);
      }
    }

    toggleSubCategory(subcategoryId);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    clearFilters();
    setCurrentPage(1);
  };

  const handleRemoveCategory = () => {
    toggleCategory(filters.categoryId);
    setCurrentPage(1);
  };

  const handleRemoveSubCategory = () => {
    toggleSubCategory(filters.subcategoryId);
    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Categoría';
  };

  const getSubCategoryName = subcategoryId => {
    for (const category of categories) {
      if (category.subcategories) {
        // Buscar la subcategoría usando la propiedad correcta
        const subcategory = category.subcategories.find(
          sub => sub.id_sub_category === subcategoryId
        );
        if (subcategory) return subcategory.sub_category_name;
      }
    }
    return 'Subcategoría';
  };

  // Actualizar la URL por cada filtro
  const [searchParams, setSearchParams] = useSearchParams();

  // lee los filtros desde la URL y los aplica
  useEffect(() => {
    const categoryId = searchParams.get('category');
    const subcategoryId = searchParams.get('subcategory');

    if (!categoryId && !subcategoryId && (filters.categoryId || filters.subcategoryId)) {
      clearFilters();
      return;
    }

    // sincroniza filtros según los parámetros
    if (categoryId && categoryId !== String(filters.categoryId)) {
      toggleCategory(parseInt(categoryId));
    }
    if (subcategoryId && subcategoryId !== String(filters.subcategoryId)) {
      toggleSubCategory(parseInt(subcategoryId));
    }
  }, [searchParams]);


  // actualiza la URL cuando cambian los filtros
  useEffect(() => {
    const params = {};
    if (filters.categoryId) params.category = filters.categoryId;
    if (filters.subcategoryId) params.subcategory = filters.subcategoryId;

    const current = Object.fromEntries(searchParams.entries());
    if (JSON.stringify(current) !== JSON.stringify(params)) {
      setSearchParams(params);
    }
  }, [filters]);

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
