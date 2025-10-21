import './Catalog.css';
import { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Catalog = () => {
  // ==========================================
  // ESTADOS
  // ==========================================
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openedCategories, setOpenedCategories] = useState({});
  
  // Productos y categorías dinámicas desde BD
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Estados de carga y paginación
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Filtros (ahora con IDs en vez de nombres)
  const [filters, setFilters] = useState({
    categoryId: null,
    subcategoryId: null
  });

  // ==========================================
  // EFECTOS
  // ==========================================
  
  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  // Cargar productos cuando cambian filtros o página
  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]);

  // ==========================================
  // FUNCIONES DE FETCH
  // ==========================================

  /**
   * Obtener categorías con subcategorías desde el backend
   */
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
        console.log('✅ Categorías cargadas:', data.data);
      } else {
        console.error('❌ Error en respuesta:', data.message);
      }
    } catch (error) {
      console.error('❌ Error al cargar categorías:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  /**
   * Obtener productos con filtros y paginación
   */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Construir query params
      const params = new URLSearchParams();
      
      if (filters.categoryId) {
        params.append('category', filters.categoryId);
      }
      
      if (filters.subcategoryId) {
        params.append('subcategory', filters.subcategoryId);
      }
      
      params.append('page', currentPage);
      params.append('limit', 20);

      console.log('📡 Fetching products:', params.toString());

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`
      );
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalProducts(data.pagination.totalProducts);
        console.log('✅ Productos cargados:', data.data.length);
      } else {
        console.error('❌ Error en respuesta:', data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // MANEJADORES DE FILTROS
  // ==========================================

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);

  /**
   * Toggle para expandir/colapsar categorías
   */
  const toggleCategory = (categoryId) => {
    setOpenedCategories(prev => ({ 
      ...prev, 
      [categoryId]: !prev[categoryId] 
    }));
  };

  /**
   * Click en una categoría
   */
  const handleCategoryClick = (categoryId) => {
    setFilters(prev => ({
      categoryId: prev.categoryId === categoryId ? null : categoryId,
      subcategoryId: null // Reset subcategoría al cambiar categoría
    }));
    setCurrentPage(1); // Reset página
    if (window.innerWidth <= 768) closeFilter();
  };

  /**
   * Click en una subcategoría
   */
  const handleSubCategoryClick = (subcategoryId) => {
    setFilters(prev => ({
      ...prev,
      subcategoryId: prev.subcategoryId === subcategoryId ? null : subcategoryId
    }));
    setCurrentPage(1); // Reset página
    if (window.innerWidth <= 768) closeFilter();
  };

  /**
   * Limpiar todos los filtros
   */
  const clearFilters = () => {
    setFilters({ categoryId: null, subcategoryId: null });
    setCurrentPage(1);
  };

  /**
   * Cambiar de página
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // FUNCIONES AUXILIARES
  // ==========================================

  /**
   * Obtener nombre de categoría por ID
   */
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  };

  /**
   * Obtener nombre de subcategoría por ID
   */
  const getSubCategoryName = (subcategoryId) => {
    for (const category of categories) {
      const subcategory = category.subcategories.find(s => s.id === subcategoryId);
      if (subcategory) return subcategory.name;
    }
    return '';
  };

  /**
   * Generar números de página para la paginación
   */
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push('...');
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="catalog-container">
      {/* Banner principal */}
      <header className="catalog-banner">
        <h1>Catálogo de Productos</h1>
      </header>

      {/* Filtros móviles */}
      <div className="mobile-filters">
        <button className="filter-mobile-btn" onClick={toggleFilter}>
          <FaFilter /> Filtros
        </button>
      </div>

      <div className="catalog-layout">
        {/* ==========================================
            SIDEBAR - FILTROS
            ========================================== */}
        <aside className={`catalog-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>Filtros</h2>
            <button className="close-filter-btn" onClick={closeFilter}>
              <FaTimes />
            </button>
          </div>

          {/* Filtros de categorías DINÁMICOS */}
          <div className="filter-categories">
            <div className="filter-header">
              <h3>Categorías</h3>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Limpiar
              </button>
            </div>

            {loadingCategories ? (
              <p className="loading-text">Cargando filtros...</p>
            ) : categories.length === 0 ? (
              <p className="no-categories-text">No hay categorías disponibles</p>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="filter-category">
                  {/* Botón de categoría */}
                  <button
                    className={`category-button ${
                      filters.categoryId === category.id ? 'active' : ''
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span>{category.name}</span>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <span
                        className="category-toggle"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category.id);
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

                  {/* Subcategorías */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div
                      className={`subcategories ${
                        openedCategories[category.id] ? 'open' : ''
                      }`}
                    >
                      {category.subcategories.map((sub) => (
                        <div key={sub.id} className="subcategory-wrapper">
                          <button
                            className={`subcategory-button ${
                              filters.subcategoryId === sub.id ? 'active' : ''
                            }`}
                            onClick={() => handleSubCategoryClick(sub.id)}
                          >
                            <span>{sub.name}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ==========================================
            MAIN - PRODUCTOS
            ========================================== */}
        <main className="catalog-main">
          {/* Indicadores de filtros activos */}
          {(filters.categoryId || filters.subcategoryId) && (
            <div className="active-filters">
              <h3>Filtros activos:</h3>
              <div className="filter-tags">
                {filters.categoryId && (
                  <span className="filter-tag">
                    {getCategoryName(filters.categoryId)}
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, categoryId: null, subcategoryId: null }))}
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.subcategoryId && (
                  <span className="filter-tag">
                    {getSubCategoryName(filters.subcategoryId)}
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, subcategoryId: null }))}
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Grid de productos */}
          <div className="products-grid">
            {loading ? (
              <div className="loading-message">
                <div className="spinner"></div>
                <p>Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="no-products-message">
                <p>
                  {filters.categoryId || filters.subcategoryId
                    ? 'No se encontraron productos con los filtros seleccionados.'
                    : 'No hay productos disponibles.'}
                </p>
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img 
                      src={product.url_image || '/placeholder-product.png'} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.png';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">
                      {product.category?.name} / {product.subcategory?.name}
                    </p>
                    {product.description && (
                      <p className="product-description">
                        {product.description.length > 100 
                          ? `${product.description.substring(0, 100)}...` 
                          : product.description}
                      </p>
                    )}
                    <button className="add-to-cart-btn">
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Resumen y paginación */}
          {products.length > 0 && (
            <>
              <div className="products-summary">
                <span>
                  Mostrando {products.length} de {totalProducts} productos
                  {totalPages > 1 && ` | Página ${currentPage} de ${totalPages}`}
                </span>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-button prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ← Anterior
                  </button>
                  
                  <div className="pagination-numbers">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>
                  
                  <button
                    className="pagination-button next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Overlay para móvil */}
      {isFilterOpen && (
        <div className="filter-overlay" onClick={closeFilter}></div>
      )}
    </div>
  );
};

export default Catalog;