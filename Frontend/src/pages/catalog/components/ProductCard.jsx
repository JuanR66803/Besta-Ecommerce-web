import React from 'react';
import './ProductCard.css';

// componente para mostrar la información de un producto en una tarjeta
const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img src={product.url_image} alt={product.name} loading="lazy" />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-category">
          {product.category} {product.subcategory && `• ${product.subcategory}`}
        </p>

        {product.description && (
          <p className="product-description">
            {product.description.length > 80
              ? `${product.description.substring(0, 80)}...`
              : product.description}
          </p>
        )}

        <div className="product-price">
          <span className="price">{product.price}</span>
        </div>

        <button className="view-details-btn">Ver Detalles</button>
      </div>
    </div>
  );
};

export default ProductCard;
