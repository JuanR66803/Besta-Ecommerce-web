import React, { useEffect } from "react";
import "./WishList.css";
import { useWishlist } from "./hooks/useWishList";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCartItem } from "../catalog/hooks/useAddCartItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) => {
  if (typeof price !== "number") {
    price = Number(price) || 0;
  }
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
};

const Wishlist = ({ isOpen }) => {
  const { wishlist, loading, wishlistCount, removeFromWishlist, refetch } =
    useWishlist();
  const { addToCart } = useCartItem();
  const navigate = useNavigate();
  // Cada vez que el sidebar se abre, recarga la wishlist
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);
  const handleRemoveFromWishlist = async (productId, productName) => {
    const success = await removeFromWishlist(productId);
    if (success) {
      toast.info(`"${productName}" eliminado de favoritos`);
    }
  };

  const handleAddToCart = async (product) => {
    const success = await addToCart(product);
    if (success) {
      toast.success(`"${product.name}" añadido al carrito!`);
    } else {
      toast.error("No se pudo añadir al carrito");
    }
  };

  const handleProductClick = (product) => {
    navigate(`/catalogo?product=${product.id}`);
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando favoritos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-title">
            <FaHeart className="heart-icon" />
            <h1>Mi Lista de Deseos</h1>
          </div>
          <p className="wishlist-count">
            {wishlistCount === 0
              ? "No tienes productos favoritos"
              : `${wishlistCount} ${
                  wishlistCount === 1 ? "producto" : "productos"
                }`}
          </p>
        </div>

        {/* Lista de productos */}
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <FaHeart className="empty-icon" />
            <h2>Tu lista de deseos está vacía</h2>
            <p>
              Explora nuestro catálogo y guarda tus productos favoritos aquí
            </p>
            <button
              className="btn-explore"
              onClick={() => navigate("/catalogo")}
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <div key={product.id} className="wishlist-card">
                {/* Imagen del producto */}
                <div
                  className="wishlist-card-image"
                  onClick={() => handleProductClick(product)}
                >
                  <img src={product.images?.[0] || '/Frontend/public/logo_fiera.png'} alt={product.name} />
                  {console.log(product.images)}
                  <button
                    className="btn-remove-wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(product.id, product.name);
                    }}
                    aria-label="Eliminar de favoritos"
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* Información del producto */}
                <div className="wishlist-card-info">
                  <h3
                    className="product-name"
                    onClick={() => handleProductClick(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="product-category">
                    {product.category?.name} • {product.subcategory?.name}
                  </p>
                  <p className="product-price">{formatPrice(product.price)}</p>

                  {/* Stock */}
                  {product.total_stock > 0 ? (
                    <p className="product-stock in-stock">
                      ✓ {product.total_stock} disponibles
                    </p>
                  ) : (
                    <p className="product-stock out-of-stock">✗ Agotado</p>
                  )}

                  {/* Botón añadir al carrito */}
                  <button
                    className="btn-add-cart"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.total_stock === 0}
                  >
                    <FaShoppingCart />
                    {product.total_stock > 0
                      ? "Añadir al carrito"
                      : "No disponible"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
