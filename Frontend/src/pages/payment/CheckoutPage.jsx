import React from "react";

function CheckoutPage() {
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:3000/api/payments/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Producto de prueba",
        price: 50000,
        quantity: 1,
      }),
    });

    const data = await response.json();
    window.location.href = data.init_point; // redirige al checkout
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Producto de prueba</h2>
      <p>$50.000</p>
      <button onClick={handleCheckout}>Pagar con Mercado Pago</button>
    </div>
  );
}

export default CheckoutPage;
