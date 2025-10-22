import React from 'react';
import './LoadingSpinner.css';

// Componente de spinner de carga reutilizable
const LoadingSpinner = ({ message = 'Cargando...' }) => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner"></div>
      <p className="loading-spinner-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;