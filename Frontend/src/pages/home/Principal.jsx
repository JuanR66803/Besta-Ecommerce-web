import React from "react";
import VideoBanner from "./components/VideoBanner";
import ImageGridSection from "./components/ImageGridSection";
import Carousel from "./components/Carousel";
const Principal = () => {
  return (
    <div>
      <VideoBanner />
      <div>
        <ImageGridSection />
      </div>
      <Carousel
        title="Productos destacados"
        images={[
          "producto 1.png",
          "producto 2.png",
          "Producto 3.png",
          "producto 4.png",
          "producto 5.png",
          "producto 6.png",
          "producto 1.png",
          "producto 2.png",
          "Producto 3.png",
          "producto 4.png",
          "producto 5.png",
          "producto 6.png"
        ]}
      />
    </div>
  );
};
export default Principal;
