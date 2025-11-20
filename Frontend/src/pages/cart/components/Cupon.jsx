import React from "react";
import "./Cupon.css";
import skyblue from "../../../../public/guayos-skyblue.png";

const Cupon = () => {
  return (
    <div className="contenedor-cupon-individual">
      {/* Parte superior */}
      <div className="parte-superior">
        {/* Imagen izquierda */}
        <div className="imagen-contenedor">
          <img src={skyblue} alt="Guayos Skyblue" className="imagen-producto" />
        </div>

        {/* Texto derecho */}
        <div className="texto-derecha">
          <div className="linea-texto">Título del producto</div>
          <div className="linea-texto">Descripción breve del producto</div>
          <div className="linea-texto">Precio o información adicional</div>
        </div>
        <div> 
          <input type="checkbox" className="check-producto" />
        </div>
      </div>

      {/* Parte inferior */}
      <div className="texto-inferior">
        Este es un texto más largo que describe el producto con más detalle,
        proporcionando información adicional sobre sus características o
        beneficios.
      </div>
    </div>
  );
};

export default Cupon;
