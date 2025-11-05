import React, { useRef, useEffect, useState } from "react";
import "./carousel.css";

const Carousel = ({ title = "Galería", images = [] }) => {
  const trackRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);

  // recalcula dimensiones
  const recalc = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    setMaxScroll(Math.round(max));
    setScrollPos(Math.round(track.scrollLeft));
  };

  useEffect(() => {
    recalc();
    const handleResize = () => recalc();
    window.addEventListener("resize", handleResize);
    const track = trackRef.current;
    if (track) track.addEventListener("scroll", () => setScrollPos(Math.round(track.scrollLeft)));
    return () => {
      window.removeEventListener("resize", handleResize);
      if (track) track.removeEventListener("scroll", () => setScrollPos(Math.round(track.scrollLeft)));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // scroll by visible chunk
  const scrollByChunk = (dir = "right") => {
    const track = trackRef.current;
    if (!track) return;
    const chunk = Math.round(track.clientWidth * 0.7); // 70% of visible area
    const target = dir === "right" ? track.scrollLeft + chunk : track.scrollLeft - chunk;
    track.scrollTo({ left: target, behavior: "smooth" });
  };



  return (
    <div className="carousel-root">
      {/* Top: title left, arrows right */}
      <div className="carousel-top">
        <div className="carousel-title">{title}</div>
        <div className="carousel-arrows">
          <button className="arrow-btn" onClick={() => scrollByChunk("left")} aria-label="Mover izquierda">‹</button>
          <button className="arrow-btn" onClick={() => scrollByChunk("right")} aria-label="Mover derecha">›</button>
        </div>
      </div>

      {/* Bottom: track  */}
      <div className="carousel-bottom">
        <div className="carousel-track-wrapper">
          <div className="carousel-track" ref={trackRef}>
            {images.map((src, i) => (
              <div className="carousel-item" key={i}>
                <img src={src} alt={`slide-${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
