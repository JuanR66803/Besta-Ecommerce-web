import './ProductModal.css';
import { FaTimes } from 'react-icons/fa';
// : Importa 'createPortal' de 'react-dom'
import { createPortal } from 'react-dom';

const formatPrice = price => {
  if (typeof price !== 'number') {
    price = Number(price) || 0;
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  console.log('Modal product:', product);

  //: Envuelve todo el JSX en createPortal
  return createPortal(
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <FaTimes />
        </button>

        <div className="modal-content">
          {/* Imagen del producto */}
          <div className="modal-image-section">
            <div className="modal-image-container">
              <img
                src={product.url_image}
                alt={product.name}
                className="modal-product-image"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="modal-info-section">
            <h2 className="modal-product-name">{product.name}</h2>

            <div className="modal-price">
              <span className="current-price">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="modal-description">
              <h3>Descripción</h3>
              <p>{product.description || 'Sin descripción disponible'}</p>
            </div>

            <div className="modal-details">
              <div className="detail-item">
                <strong>Categoría:</strong>
                <span>{product.category?.name || 'Sin categoría'}</span>
              </div>
              <div className="detail-item">
                <strong>Subcategoría:</strong>
                <span>{product.subcategory?.name || 'Sin subcategoría'}</span>
              </div>
              <div className="detail-item">
                <strong>Referencia:</strong>
                <span>{product.reference}</span>
              </div>

              <div className="detail-item">
                <strong>Tallas:</strong>
                <span>{product.sizes.join(', ')}</span>
              </div>

              <div className="detail-item">
                <strong>Colores:</strong>
                <span className="color-swatches">
                  {product.colors.map((hex, idx) => (
                    <span
                      key={idx}
                      className="color-swatch"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </span>
              </div>
              {product.total_stock > 0 && (
                <div className="detail-item">
                  <strong>Stock:</strong>
                  <span>{product.total_stock} unidades</span>
                </div>
              )}
            </div>
            <button
              className="add-to-cart-button"
              disabled={product.total_stock === 0}
            >
              {product.total_stock > 0 ? 'Añadir al carrito' : 'Agotado'}
            </button>

            <div className="modal-info">
              <p className="store-availability">
                <strong>✓ Disponible en tienda física</strong>
              </p>
              <p>Visítanos para ver y probar el producto</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    // Especifica el destino del portal
    document.getElementById('modal-root')
  );
};

export default ProductModal;
