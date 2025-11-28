import React from 'react';
import './PaymentProductItem.css';

const PaymentProductItem = ({ nombre, descripcion, precio, cantidad, imagen }) => {
  return (
    <div className="payment-product-item">
      <div className="product-left-payment">
        <img src={imagen} alt={nombre} className="product-image-payment" />
      </div>

      <div className="product-center-payment">
        <div className="product-name-payment">{nombre ?? "Nombre del producto"}</div>
        <div className="product-description-payment">{descripcion ?? "Descripción del producto"}</div>
        <div className="product-price-payment">${precio ?? 0}</div>
      </div>

      <div className="product-right-payment">
        <div className="quantity-title-payment">Cantidad</div>
        <div className="quantity-value-payment">{cantidad ?? 0}</div>
      </div>
    </div>
  );
};

export default PaymentProductItem;
