import React from 'react';
import './ProductCard.css';

// Función para formatear el precio como moneda (COP)
const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = Number(price) || 0;
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0, // O pon 2 si manejas centavos
  }).format(price);
};

// componente para mostrar la información de un producto en una tarjeta
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
        <img
          src={product.url_image || '/placeholder-product.png'}
          alt={product.name}
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {/* --- ESTE ES EL CAMBIO --- */}
        {/* Reemplazamos 'product-category' por 'product-price' */}
        <p className="product-price">
          {formatPrice(product.price)}
        </p>
        {/* --- FIN DEL CAMBIO --- */}

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