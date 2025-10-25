import React from 'react';
import './ProductGrid.css';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { FaBoxOpen } from 'react-icons/fa';

const ProductGrid = ({
  products,
  loading,
  onProductClick,
  columns = { mobile: 2, tablet: 3, desktop: 4, largeDesktop: 5 },
}) => {
  if (loading) {
    return (
      <div className="product-grid-loading">
        <LoadingSpinner message="Cargando productos..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <FaBoxOpen className="no-products-icon" />
        <p>No se encontraron productos con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div
      className="products-grid"
      style={{
        '--mobile-columns': columns.mobile,
        '--tablet-columns': columns.tablet,
        '--desktop-columns': columns.desktop,
        '--large-desktop-columns': columns.largeDesktop,
      }}
    >
      {products.map(product => (
        <ProductCard
          key={product.id_product_details} // Usar una key única del producto
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;