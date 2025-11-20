import './ProductModal.css';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { useCartItem } from '../hooks/useAddCartItem';
import { useState } from 'react'; 
import { toast } from 'react-toastify'; 

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
  const { addToCart, loading, error } = useCartItem();
  // Estado para controlar la imagen activa del carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
      setCurrentImageIndex(0); // Resetear al cerrar
    }
  };

  const handleAddCart = async () => {
    const success = await addToCart(product);
    if (success) {
      toast.success(`"${product.name}" añadido al carrito!`);
      onClose();
      setCurrentImageIndex(0);
    } else {
      toast.error('No se pudo añadir el producto al carrito.');
    }
  };

  //  Funciones para navegar por el carrusel
  const handleNextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(prev =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(prev =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const handleThumbnailClick = index => {
    setCurrentImageIndex(index);
  };

  // Usar el array de imágenes
  const currentImage =
    product.images && product.images.length > 0
      ? product.images[currentImageIndex]
      : product.url_image || '/placeholder-product.png';

  const hasMultipleImages = product.images && product.images.length > 1;

  return createPortal(
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal">
        <button
          className="modal-close-btn"
          onClick={() => {
            onClose();
            setCurrentImageIndex(0);
          }}
          aria-label="Cerrar"
        >
          <FaTimes />
        </button>

        <div className="modal-content">
          {/* Sección de imagen con carrusel */}
          <div className="modal-image-section">
            <div className="modal-image-container">
              <img
                src={currentImage}
                alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                className="modal-product-image"
              />

              {/* Controles del carrusel (solo si hay múltiples imágenes) */}
              {hasMultipleImages && (
                <>
                  <button
                    className="carousel-button carousel-prev"
                    onClick={handlePrevImage}
                    aria-label="Imagen anterior"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="carousel-button carousel-next"
                    onClick={handleNextImage}
                    aria-label="Siguiente imagen"
                  >
                    <FaChevronRight />
                  </button>

                  {/* Indicador de posición */}
                  <div className="carousel-indicator">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Miniaturas (solo si hay múltiples imágenes) */}
            {hasMultipleImages && (
              <div className="modal-image-thumbnails">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} - vista ${index + 1}`}
                    className={`thumbnail ${
                      index === currentImageIndex ? 'active' : ''
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Información del producto (sin cambios) */}
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
              onClick={handleAddCart}
              className="add-to-cart-button"
              disabled={product.total_stock === 0 || loading}
            >
              {loading
                ? 'Añadiendo...'
                : product.total_stock > 0
                ? 'Añadir al carrito'
                : 'Agotado'}
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
    document.getElementById('modal-root')
  );
};

export default ProductModal;
