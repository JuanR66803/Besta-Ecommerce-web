import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ImageCarousel.css";

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images?.length || 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  if (!images || images.length === 0) return null;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <div className="carousel">
      <button className="arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>

      <div className="carousel__images">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
          >
            {index === current && (
              <img src={img} alt={`slide-${index}`} className="carousel__img" />
            )}
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      {/* 🔘 Indicadores inferiores */}
      <div className="carousel__dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
