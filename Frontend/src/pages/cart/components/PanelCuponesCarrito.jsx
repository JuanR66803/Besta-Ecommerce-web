import React, { useState, useRef, useEffect } from "react";
import "./PanelCuponesCarrito.css";
import { FaCaretDown } from "react-icons/fa";
import Cupones from "./Cupones.jsx";
const PanelCuponesCarrito = ({
  totalItems = 0,
  totalValue = "$0.00",
  onContinue = () => {},
}) => {
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleDesplegable = () => {
    setAbierto(!abierto);
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
            Total artículos: {totalItems}
          </div>
          <div className="valor-total-carrito">{totalValue}</div>
          <button
            className="boton-continuar-carrito"
            onClick={onContinue}
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
