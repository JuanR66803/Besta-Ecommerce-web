import React from "react";
import "./ImageTextBanner.css";

const ImageTextBanner = ({ imageUrl, line1, line2, buttonText = "Ver más" }) => {
  return (
    <div className="image-banner">
      <img src={imageUrl} alt="banner" className="image-banner__img" />

      {/* Contenedor del texto y botón */}
      <div className="image-banner__content">
        <div className="text-line line1">{line1}</div>
        <div className="text-line line2">{line2}</div>
        <div className="button-container">
          <button className="banner-button">{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default ImageTextBanner;
