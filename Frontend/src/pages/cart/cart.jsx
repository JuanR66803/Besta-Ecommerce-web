import React from "react";
import "./cart.css";
import ProductoCarrito from "../../components/ProductoCarrito/ProductoCarrito.jsx";
const Cart = () => {
  return (
    <div className="cart-container">
      <div className="header-fijo">
        <h1>Carrito de Compras</h1>
      </div>
      <div className="contenido-producto-titulo">
        <input type="checkbox" className="check" />
        <div className="nombre">Producto</div>
        <div className="campo">Precio Unitario</div>
        <div className="campo">Cantidad</div>
        <div className="campo">Total</div>
        <div className="campo">Acciones</div>
      </div>
      <ProductoCarrito />
      <div className="div-pago">
        <h2>Resumen de Pago</h2>
      </div>
    </div>
  );
};

export default Cart;
