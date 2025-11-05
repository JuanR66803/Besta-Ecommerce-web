import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import "./WishlistItem.css";

const WishlistItem = () => {
  return (
    <div className="wishlist-item">
      {/* Imagen (izquierda) */}
      <div className="wishlist-item__image">
        <img
          src="https://via.placeholder.com/80" // Aquí luego insertarás la URL real
          alt="Producto"
        />
      </div>

      {/* Información (centro) */}
      <div className="wishlist-item__info">
        <div className="wishlist-item__name">Nombre del producto</div>
        <div className="wishlist-item__description">
          Descripción breve del producto que luego puedes personalizar.
        </div>
        <div className="wishlist-item__price">$40.000</div>
      </div>

      {/* Acciones (derecha) */}
      <div className="wishlist-item__actions">
        <FaTrash className="icon delete" />
        <FaShoppingCart className="icon cart" />
      </div>
    </div>
  );
};

export default WishlistItem;
