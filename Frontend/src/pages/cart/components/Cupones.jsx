import React from "react";
import "./Cupones.css";
import Cupon from "./Cupon.jsx";

const Cupones = () => {
  return (
    <div className="contenedor-lista-cupones">
      <div className="titulo-cupones"> Cupones disponibles</div>
      <div className="busqueda-cupones">
        <p className="texto-busqueda">Buscar cupones:</p>
        <input
          type="text"
          className="input-busqueda"
          placeholder="Escribe el nombre del cupón..."
        />
        <button className="boton-buscar">Buscar</button>
      </div>
      <div className="raya"></div>

      <div className="cupones-lista">
        <Cupon />
        <Cupon />
        <Cupon />
      </div>
    </div>
  );
};

export default Cupones;
