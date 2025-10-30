import React, { useState } from "react";
import "./Tallas.css";

function Tallas() {
  const [tallaZapato, setTallaZapato] = useState(null);
  const [tallaRopa, setTallaRopa] = useState(null);

  const tallasZapato = [38, 39, 40, 41];
  const tallasRopa = ["S", "M", "L", "XL"];

  return (
    <div className="contenedor-tallas">
      {/* Tallas de Zapatos */}
      <div className="grupo-tallas">
        <h3>Tallas de Zapatos</h3>
        <div className="lista-tallas">
          {tallasZapato.map((talla) => (
            <div
              key={talla}
              className={`talla ${tallaZapato === talla ? "seleccionada" : ""}`}
              onClick={() => setTallaZapato(talla)}
            >
              {talla}
            </div>
          ))}
        </div>
      </div>

      {/* Tallas de Ropa */}
      <div className="grupo-tallas">
        <h3>Tallas de Ropa</h3>
        <div className="lista-tallas">
          {tallasRopa.map((talla) => (
            <div
              key={talla}
              className={`talla ${tallaRopa === talla ? "seleccionada" : ""}`}
              onClick={() => setTallaRopa(talla)}
            >
              {talla}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tallas;
