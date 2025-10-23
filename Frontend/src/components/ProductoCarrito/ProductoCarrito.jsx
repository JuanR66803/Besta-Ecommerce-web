import React, { useState, useRef, useEffect } from "react";
import "./ProductoCarrito.css";
import { FaCaretDown, FaBox, FaTicketAlt } from "react-icons/fa";
import skyblue from "../../../public/guayos-skyblue.png";
import Tallas from "../ProductoCarrito/Tallas.jsx";
import Cupones from "../ProductoCarrito/Cupones.jsx";
const ProductoCarrito = () => {
  const [cantidad, setCantidad] = useState(1);
  const incrementar = () => setCantidad(cantidad + 1);
  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const [abierto, setAbierto ] = useState(false);
  const [abierto2, setAbierto2] = useState(false);
  const botonRef = useRef(null);
  const botonRef2 = useRef(null);
  const [posicion, setPosicion] = useState({
    top: 0,
    left: 0,
  });
  const [posicion2, setPosicion2] = useState({
    top: 0,
    left: 0,
  });

  const toggleDesplegable = () => {
    if (botonRef.current) {
      const rect = botonRef.current.getBoundingClientRect();
      setPosicion({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setAbierto(!abierto);
  };
  const toggleDesplegable2 = () => {
    if (botonRef2.current) {
      const rect = botonRef2.current.getBoundingClientRect();
      setPosicion2({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setAbierto2(!abierto2);
  };

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (
        botonRef.current &&
        !botonRef.current.contains(e.target) &&
        !document.querySelector(".menu-desplegable")?.contains(e.target)
      ) {
        setAbierto(false);
      }
    };
    document.addEventListener("click", handleClickFuera);
    return () => document.removeEventListener("click", handleClickFuera);
  }, []);
  useEffect(() => {
    const handleClickFuera2 = (e) => {
      if (
        botonRef2.current &&
        !botonRef2.current.contains(e.target) &&
        !document.querySelector(".menu-desplegable2")?.contains(e.target)
      ) {
        setAbierto2(false);
      }
    };
    document.addEventListener("click", handleClickFuera2);
    return () => document.removeEventListener("click", handleClickFuera2);
  }, []);

  return (
    <div className="contenedor-producto-carrito">
      <div className="contenedor-categoria">
        <input type="checkbox" className="check-producto" />
        <FaBox className="icono-categoria" />
        <div className="nombre-categoria">Producto</div>
      </div>

      <div className="contenedor-producto">
        <input type="checkbox" className="check-producto" />
        <div className="contenedor-imagen">
          <img src={skyblue} alt="Producto" className="imagen-producto" />
        </div>
        <div className="descripcion-producto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
          voluptatibus eum obcaecati non corrupti vel fugiat corporis neque
          magnam ipsum rem aperiam nesciunt dicta laboriosam recusandae
          assumenda cum, mollitia sunt.
        </div>
        <div className="contenedor-variaciones">
          <button
            className="boton-desplegable"
            ref={botonRef}
            onClick={toggleDesplegable}
          >
            Variaciones: <FaCaretDown size={20} color="#555" />
          </button>
          {abierto && (
            <div
              className="menu-desplegable"
              style={{ top: `${posicion.top}px`, left: `${posicion.left}px` }}
              onClick={(e) => e.stopPropagation()} // 🔥 Esto evita que se cierre
            >
              <Tallas />
            </div>
          )}
        </div>
        <div className="contenedor-precio">
          <span className="precio-antiguo">$120.000</span>
          <span className="precio-actual">$89.900</span>
        </div>
        <div className="contenedor-contador">
          <button onClick={decrementar} className="boton-contador">
            −
          </button>
          <span className="valor-contador">{cantidad}</span>
          <button onClick={incrementar} className="boton-contador">
            +
          </button>
        </div>
        <div className="contenedor-precio-total">
          <span className="precio-total">$89.900</span>
        </div>
        <div className="contenedor-acciones">
          <button className="boton-accion-eliminar">Eliminar</button>
          <button className="boton-accion-buscar">
            Buscar similares <FaCaretDown size={20} color="#555" />
          </button>
        </div>
      </div>

      <div className="contenedor-cupones">
        <div>
          <FaTicketAlt size={20} color="#ff9800" />
        </div>
        <div className="contenedor-variaciones">
          <button
            className="boton-desplegable"
            ref={botonRef2}
            onClick={toggleDesplegable2}
          >
            Agregar cupon de descuento
          </button>
          {abierto2 && (
            <div
              className="menu-desplegable2"
              style={{ top: `${posicion2.top}px`, left: `${posicion2.left}px` }}
              onClick={(e) => e.stopPropagation()} // 🔥 Esto evita que se cierre
            >
              < Cupones />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoCarrito;
