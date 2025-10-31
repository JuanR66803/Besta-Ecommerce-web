import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./BubbleMessage.css";

const BubbleMessage = () => {
  const [visible, setVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div
      className="bubble__container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Mensajito emergente */}
      {showTooltip && <div className="bubble__tooltip">¿Necesitas ayuda?</div>}

      {/* Botón cerrar */}
      <button className="bubble__close" onClick={() => setVisible(false)}>
        <AiOutlineClose size={16} />
      </button>

      {/* Burbuja principal */}
      <div className="bubble__icon" onClick={() => navigate("/contacto")}>
        <FaComments size={30} />
      </div>
    </div>
  );
};

export default BubbleMessage;
