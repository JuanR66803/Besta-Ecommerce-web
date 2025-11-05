import React from "react";
import "./WishlistSidebar.css";
import WishlistItem from "./WishListItem";
const WishlistSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`wishlist-sidebar ${isOpen ? "open" : ""}`}>
      <div className="wishlist-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Mi Wishlist</h2>
        <p>Aquí aparecerán tus productos favoritos ❤️</p>
        <WishlistItem />
      </div>
    </div>
  );
};

export default WishlistSidebar;
