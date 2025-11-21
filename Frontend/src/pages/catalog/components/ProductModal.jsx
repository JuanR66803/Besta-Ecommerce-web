import './ProductModal.css';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
} from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { useCartItem } from '../hooks/useAddCartItem';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useWishlist } from '../../wishlist/hooks/useWishList';

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
  const { addToCart, loading } = useCartItem();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hooks de wishlist (se usa el hook existente `useWishlist`)
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist: isInWishlistFn,
    loading: wishlistLoading,
    wishlistCount,
  } = useWishlist();

  // Estado local para controlar si el producto está en la wishlist
  const [isInWishlist, setIsInWishlist] = useState(false);
  const checkingWishlist = wishlistLoading;

  // Sincronizar el estado local con la wishlist global cuando cambie la lista o el producto
  useEffect(() => {
    if (product?.id != null) {
      try {
        setIsInWishlist(Boolean(isInWishlistFn(product.id)));
      } catch (err) {
        setIsInWishlist(false);
      }
    }
  }, [product?.id, isInWishlistFn, wishlistCount]);

  if (!isOpen || !product) return null;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
      setCurrentImageIndex(0);
    }
  };

  //Función mejorada para añadir al carrito
  const handleAddCart = async () => {
    try {
      if (!product.id) {
        toast.error('Producto inválido. No se puede añadir al carrito.');
        return;
      }

      const success = await addToCart(product);

      if (success) {
        toast.success(`"${product.name}" añadido al carrito!`, {
          position: 'bottom-right',
          autoClose: 3000,
        });
        onClose();
        setCurrentImageIndex(0);
      } else {
        toast.error(
          'No se pudo añadir el producto al carrito. Intenta de nuevo.'
        );
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      toast.error('Error inesperado. Por favor, intenta de nuevo.');
    }
  };

  // Función con llamadas reales a la API
  const handleToggleWishlist = async () => {
    try {
      if (isInWishlist) {
        // Eliminar de wishlist
        const success = await removeFromWishlist(product.id);

        if (success) {
          setIsInWishlist(false);
          toast.info(`"${product.name}" eliminado de favoritos`, {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      } else {
        // Añadir a wishlist
        const success = await addToWishlist(product.id);

        if (success) {
          setIsInWishlist(true);
          toast.success(`"${product.name}" añadido a la lista de deseos ❤️`, {
            position: 'bottom-right',
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      console.error('Error al gestionar wishlist:', error);
      toast.error('Error al actualizar favoritos. Intenta de nuevo.');
    }
  };

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
          <div className="modal-image-section">
            <div className="modal-image-container">
              <img
                src={currentImage}
                alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                className="modal-product-image"
              />

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

                  <div className="carousel-indicator">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

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
                <span>{product.sizes?.join(', ') || 'N/A'}</span>
              </div>

              {product.colors && product.colors.length > 0 && (
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
              )}

              {product.total_stock > 0 && (
                <div className="detail-item">
                  <strong>Stock:</strong>
                  <span>{product.total_stock} unidades</span>
                </div>
              )}
            </div>

            
            <div className="modal-actions">
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

              <button
                onClick={handleToggleWishlist}
                className={`wishlist-button ${isInWishlist ? 'active' : ''}`}
                disabled={checkingWishlist} 
                aria-label={
                  isInWishlist ? 'Quitar de favoritos' : 'Añadir a favoritos'
                }
                title={
                  isInWishlist ? 'Quitar de favoritos' : 'Añadir a favoritos'
                }
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ProductModal;
