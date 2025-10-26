import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import './ProductGrid.css';

// Componente para mostrar una cuadrícula de productos
const ProductGrid = ({ products, loading, hasFilters, onProductClick }) => {
  if (loading) {
    return (
      <div className="products-grid">
        <div className="loading-message">
          <LoadingSpinner message="Cargando productos..." />
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="products-grid">
        <div className="no-products-message">
          <div className="no-products-icon">📦</div>
          <p>
            {hasFilters
              ? 'No se encontraron productos con los filtros seleccionados.'
              : 'No hay productos disponibles en este momento.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;