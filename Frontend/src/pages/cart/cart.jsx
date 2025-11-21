import React, { useState, useEffect } from "react";
import "./cart.css";
import ProductoCarrito from "./components/ProductoCarrito.jsx";
import { FaSearch } from "react-icons/fa";
import PanelCuponesCarrito from "./components/PanelCuponesCarrito.jsx";
import { useGetCartItems } from "./hooks/useGetCartItem.js";
const Cart = () => {
  const { getCartItems, deleteCartItem } = useGetCartItems();
  const [cartData, setCartData] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);


  // 🔹 Función que maneja selección/deselección
  const manejarSeleccionProducto = (producto, seleccionado) => {
    if (!producto) return; // Evita errores si producto llega undefined

    setProductosSeleccionados((prev = []) => {
      const filtrados = prev.filter(
        (p) => p && p.id_shopping_cart_item !== producto.id_shopping_cart_item
      );

      if (seleccionado) {
        return [...filtrados, producto];
      }

      return filtrados;
    });
  };
  const total = productosSeleccionados.reduce(
    (acc, p) => acc + Number(p.product_price) * Number(p.quantity),
    0
  );
  const cantidadTotal = productosSeleccionados.reduce(
    (acc, p) => acc + p.quantity,
    0
  );

  //aqui estan los datos del carrito
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartItems(); 
        console.log("Datos del carrito del usuario registrado:", data);
        setCartData(data.carItems || []);
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
      <div className="carrito-container">
        {cartData.length > 0 ? (
          cartData.map((item, index) => (
            <ProductoCarrito
              key={index}
              producto={item}
              onProductoSeleccionado={manejarSeleccionProducto}
              deleteCartItem={deleteCartItem}
              setCartData={setCartData}
            />
          ))
        ) : (
          <p className="carrito-vacio">🛒 No hay productos en el carrito</p>
        )}
      </div>
      <div className="div-pago">
        <PanelCuponesCarrito total={total} cantidadTotal={cantidadTotal} />
      </div>
    </div>
  );
};

export default Cart;
