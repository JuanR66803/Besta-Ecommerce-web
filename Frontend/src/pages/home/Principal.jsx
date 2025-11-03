import ImageCarousel from "./components/ImageCarousel";
import React from "react";
import VideoBanner from "./components/VideoBanner";
import ImageTextBanner from "./components/ImageTextBanner";
import ImageGridSection from "./components/ImageGridSection";
/*const imgs = [
  "/public/background-signup.jpg",
  "/public/guayos-skyblue.png",
  "/public/logo_fiera.png"
];*/

const Principal = () => {
  return (
    <div>
      {/* <ImageCarousel images={imgs} autoplay interval={2000} showThumbnails startIndex={0} /> */}
      <VideoBanner />
      <div>
        <ImageGridSection />
      </div>
    </div>
  );
};
export default Principal;
