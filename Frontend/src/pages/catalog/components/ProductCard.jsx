import React from 'react';
import './ProductCard.css';

// componente para mostrar la información de un producto en una tarjeta
const ProductCard = ({ product, onClick }) => {
  const handleImageError = (e) => {
    e.target.src = '/placeholder-product.png';
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.url_image || '/placeholder-product.png'} 
          alt={product.name}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
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
        
        <button 
          className="add-to-cart-btn"
          onClick={() => onClick && onClick(product)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;