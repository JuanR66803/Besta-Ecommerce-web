import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  // Formateador para el precio
  const formatPrice = price => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" /> //imagen del producto
      </div>

      <div className="product-info">
        <p className="product-category">
          {product.category} {product.subcategory && `• ${product.subcategory}`}
        </p>

        <h3 className="product-name">{product.name}</h3>

        <div className="product-price">
          <span className="price">{formatPrice(product.price)}</span>
        </div>

        <button className="view-details-btn">Ver Detalles</button>
      </div>
    </div>
  );
};

export default ProductCard;