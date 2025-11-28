import React from 'react';
import { useNavigate } from "react-router-dom";
import './PaymentReceipt.css';
import PaymentProductItem from './PaymentProductItem.jsx';

const PaymentReceipt = ({ totalArticulos, totalPagar, productosSeleccionados, onClose }) => {

  const navigate = useNavigate();

  // Cierra el modal si se hace clic fuera del contenido
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('payment-modal')) {
      onClose();
    }
  };

  const handlePay = () => {
    navigate("/checkout/payment-method", {
      state: {
        productosSeleccionados,
        total: totalPagar
      }
    });
  };

  return (
    <div className="payment-modal" onClick={handleBackgroundClick}>
      <div className="payment-container">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2 className="payment-title">Comprobante de pago</h2>

        <div className='payment-content'>
          <div className="payment-info">
            <div><strong>Total de artículos:</strong> {totalArticulos ?? 0}</div>
            <div><strong>Total a pagar:</strong> ${totalPagar ?? 0}</div>
            <div><strong>Fecha:</strong> {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <button className="payment-button" onClick={handlePay}>Pagar</button>
      </div>
    </div>
  );
};

export default PaymentReceipt;
