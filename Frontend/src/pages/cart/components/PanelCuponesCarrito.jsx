import React, { useState, useRef, useEffect } from "react";
import "./PanelCuponesCarrito.css";
import { FaCaretDown } from "react-icons/fa";
import Cupones from "./Cupones.jsx";
import { useNavigate } from "react-router-dom";

const PanelCuponesCarrito = ({ total, cantidadTotal, productosSeleccionados }) => {
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleDesplegable = () => {
    setAbierto(!abierto);
  };

  const handleContinue = () => {
    if (cantidadTotal === 0) {
      alert("Selecciona al menos un producto para continuar");
      return;
    }

    navigate("/checkout/payment-method", {
      state: {
        productosSeleccionados,
        total
      }
    });
  };

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (
        botonRef.current &&
        !botonRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setAbierto(false);
      }
    };
    document.addEventListener("click", handleClickFuera);
    return () => document.removeEventListener("click", handleClickFuera);
  }, []);

  return (
    <div className="panel-cupones-carrito">
      {/* Parte superior */}
      <div className="superior-cupones-carrito">
        <div className="grupo-derecha-superior-carrito">
          <div className="badge-cupon-carrito">Cupón de plataforma</div>

          <button
            className="boton-desplegable"
            ref={botonRef}
            onClick={toggleDesplegable}
          >
            Seleccione Cupón <FaCaretDown className="icono-caret-down" />
          </button>

          {abierto && (
            <div className="overlay-cupon" onClick={() => setAbierto(false)}>
              <div
                className="menu-desplegable-cupon-plataforma"
                ref={menuRef}
                onClick={(e) => e.stopPropagation()}
              >
                <Cupones />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Parte inferior */}
      <div className="inferior-cupones-carrito">
        {/* IZQUIERDA (controles) */}
        <div className="izquierda-inferior-carrito">
          <label className="check-wrapper-carrito">
            <input type="checkbox" className="check-input-carrito" />
            <span className="check-caja-carrito" />
          </label>

          <button className="accion-texto-carrito">Seleccionar todo</button>
          <button className="accion-texto-carrito">Eliminar</button>
          <button className="accion-texto-carrito">Mover a deseos</button>
        </div>
        {/* DERECHA (resumen y acción) */}
        <div className="derecha-inferior-carrito">
          <div className="total-articulos-carrito">
            Total artículos: {cantidadTotal}
            {console.log("Cantidad Total en PanelCuponesCarrito:", cantidadTotal)}
          </div>
          {console.log("Total General en PanelCuponesCarrito:", total)}

          <div className="valor-total-carrito">${total?.toFixed(2) ?? 0}</div>

          <button
            className="boton-continuar-carrito"
            onClick={handleContinue}
            type="button"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelCuponesCarrito;
