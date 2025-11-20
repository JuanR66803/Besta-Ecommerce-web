import React from 'react';
import './CatalogBanner.css';

// Componente para mostrar el banner del catálogo de productos
const CatalogBanner = ({ title = 'Catálogo de Productos', subtitle = null }) => {
  return (
    <header className="catalog-banner">
      <div className="catalog-banner-content">
        <h1>{title}</h1>
        {subtitle && <p className="catalog-banner-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
};

export default CatalogBanner;