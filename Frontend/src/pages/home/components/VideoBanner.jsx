import React from "react";
import "./VideoBanner.css";

const VideoBanner = () => {
  return (
    <div className="video-banner">
      {/* 🎬 Video de fondo */}
      <video
        className="video-banner__video"
        src="../../public/SOCCER INTRO.mp4" // reemplázala con tu URL
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* 🧾 Contenido sobre el video */}
      <div className="video-banner__overlay">
        <div className="text-line">Colección 2025</div>
        <div className="text-line">Diseño, fuerza y precisión</div>
        <div className="text-line">Elige tu mejor versión</div>
        <div className="button-container">
          <button className="buy-button">Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
