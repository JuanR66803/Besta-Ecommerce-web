import React from 'react';
import './ProductGrid.css';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const ProductGrid = ({ products, loading, onProductClick }) => {
  if (loading) {
    return (
      <div className="product-grid-loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No se encontraron productos con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
