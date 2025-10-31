import React, { useEffect } from "react";
import "./cart.css";
import ProductoCarrito from "./components/ProductoCarrito.jsx";
import { FaSearch } from "react-icons/fa";
import PanelCuponesCarrito from "./components/PanelCuponesCarrito.jsx";
import { useGetCartItems } from "./hooks/useGetCartItem.js";
const Cart = () => {
  const { getCartItems } = useGetCartItems();
 //aqui estan los datos del carrito
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartItems(); // solo es para mostrar los datos que trae el carrito 
        console.log("Datos del carrito del usuario registrado:", data);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    fetchCart();
  }, []); 

  return (
    <div className="cart-container">
      <div className="header-carrito">
        <div className="contenedor-carrito">
          <div className="logo-texto-carrito">
            <h2>Besta | Carrito de compras</h2>
          </div>

          <div className="buscador-carrito">
            <input
              type="text"
              placeholder="Buscar producto..."
              className="input-busqueda-carrito"
            />
            <button className="boton-buscar-carrito">
              <FaSearch size={16} />
            </button>
          </div>
        </div>
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
      <ProductoCarrito />
      <div className="div-pago">
        <PanelCuponesCarrito />
      </div>
    </div>
  );
};

export default Cart;
