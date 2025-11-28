import React, { useEffect } from "react";
import "./WishListSidebar.css";
import Wishlist from '../pages/wishlist/WishList';

const WishlistSidebar = ({ isOpen, onClose, wishlistData, refetch }) => {

  // Llama a la función de recarga cada vez que se abre
  useEffect(() => {
    if (isOpen && refetch) {
      refetch();
    }
  }, [isOpen, refetch]);

  return (
    <div className={`wishlist-sidebar ${isOpen ? "open" : ""}`}>
      <div className="wishlist-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <Wishlist isOpen={isOpen} onClose={onClose} /> {/* <-- pasar datos */}
      </div>
    </div>
  );
};

export default WishlistSidebar;
