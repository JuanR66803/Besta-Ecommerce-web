import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
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
  const isMounted = useRef(false);
  // Hook para manejar filtros
  const {
    filters,
    openedCategories,
    toggleCategory,
    toggleSubCategory,
    clearFilters,
    toggleCategoryExpansion,
    updateFilters,
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
    // Buscar la categoría padre
    const parentCategory = categories.find(cat =>
      cat.subcategories?.some(sub => sub.id_sub_category === subcategoryId)
    );

    if (parentCategory) {
      // ✅ USA 'updateFilters' PARA ESTABLECER AMBOS A LA VEZ
      updateFilters({
        categoryId: parentCategory.id,
        subcategoryId: subcategoryId
      });
    } else {
      // Fallback (aunque no debería pasar si la data es correcta)
      toggleSubCategory(subcategoryId);
    }

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
  // 1. Busca por 'id' (no 'id_category')
  // 2. Usa '==' para comparar '1' == 1 (string == número)
  const category = categories.find(cat => cat.id == categoryId);
  return category?.name || 'Categoría';
};

const getSubCategoryName = subcategoryId => {
  for (const category of categories) {
    if (category.subcategories) {
      // 1. Usa '==' para comparar '2' == 2 (string == número)
      const subcategory = category.subcategories.find(
        sub => sub.id_sub_category == subcategoryId
      );
      if (subcategory) return subcategory.sub_category_name;
    }
  }
  return 'Subcategoría';
};

  useEffect(() => {
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');

  // Si la URL tiene filtros cuando cargamos,
  // actualiza el estado de filtros
  if (categoryId || subcategoryId) {
    updateFilters({
      categoryId: categoryId ? parseInt(categoryId) : null,
      subcategoryId: subcategoryId ? parseInt(subcategoryId) : null
    });
  }
}, []);

  // Actualizar la URL por cada filtro
  const [searchParams, setSearchParams] = useSearchParams();


  // actualiza la URL cuando cambian los filtros
  useEffect(() => {
    // Si no es la primera vez que se renderiza, actualiza la URL
    if (isMounted.current) {
      const params = {};
      if (filters.categoryId) params.category = filters.categoryId;
      if (filters.subcategoryId) params.subcategory = filters.subcategoryId;

      const current = Object.fromEntries(searchParams.entries());

      // Compara y actualiza si es necesario
      if (JSON.stringify(current) !== JSON.stringify(params)) {
        setSearchParams(params);
      }
    } else {
      // En la primera carga, solo marca 'isMounted' como true
      isMounted.current = true;
    }
  }, [filters, setSearchParams]);

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
