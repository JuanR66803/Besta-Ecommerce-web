import './ProductModal.css';
import { FaTimes } from 'react-icons/fa';

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal">
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
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
              <span className="current-price">{product.price}</span>
            </div>

            <div className="modal-description">
              <h3>Descripción</h3>
              <p>{product.description || 'Sin descripción disponible'}</p>
            </div>

            <div className="modal-details">
              <div className="detail-item">
                <strong>Categoría:</strong>
                <span>{product.category}</span>
              </div>
              <div className="detail-item">
                <strong>Subcategoría:</strong>
                <span>{product.subcategory}</span>
              </div>
              <div className="detail-item">
                <strong>Referencia:</strong>
                <span>{product.num_referencia}</span>
              </div>
              {product.type && (
                <div className="detail-item">
                  <strong>Tipo:</strong>
                  <span>{product.type}</span>
                </div>
              )}
              <div className="detail-item">
                <strong>Tallas:</strong>
                <span>{product.size_min} - {product.size_max}</span>
              </div>
              <div className="detail-item">
                <strong>Colores:</strong>
                <span className="color-swatches">
                  {product.color &&
                    product.color.split(',').map((hex, idx) => (
                      <span
                        key={idx}
                        className="color-swatch"
                        style={{
                          backgroundColor: hex.trim(),
                        }}
                        title={hex.trim()}
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

            <div className="modal-info">
              <p className="store-availability">
                <strong>✓ Disponible en tienda física</strong>
              </p>
              <p>Visítanos para ver y probar el producto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;