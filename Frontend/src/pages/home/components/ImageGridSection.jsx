import React from "react";
import ImageTextBanner from "./ImageTextBanner";
import "./ImageGridSection.css";

const ImageGridSection = () => {
  // 🔹 Datos quemados (luego puedes reemplazar por props o datos del backend)
  const banners = [
    {
      imageUrl: "/guayos.png",
      line1: "Colección Invierno",
      line2: "Explora lo nuevo",
      buttonText: "Comprar"
    },
    {
      imageUrl: "/balon.png",
      line1: "Estilo urbano",
      line2: "Comodidad y diseño",
      buttonText: "Ver más"
    },
    {
      imageUrl: "/accesorios.jpg",
      line1: "Deportivos premium",
      line2: "Máximo rendimiento",
      buttonText: "Descubrir"
    },
    {
      imageUrl: "/camisa.jpg",
      line1: "Ofertas exclusivas",
      line2: "Hasta 50% off",
      buttonText: "Aprovechar"
    }
  ];

  return (
    <div className="image-grid-section">
      {banners.map((item, index) => (
        <ImageTextBanner
          key={index}
          imageUrl={item.imageUrl}
          line1={item.line1}
          line2={item.line2}
          buttonText={item.buttonText}
        />
      ))}
    </div>
  );
};

export default ImageGridSection;
