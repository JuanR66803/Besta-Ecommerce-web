import { useLocation } from "react-router-dom";
import "./CheckoutPages.css";

function CheckoutPage() {
  const { state } = useLocation();
  const { productosSeleccionados, total } = state || {};

  
const handleCheckoutOnline = async () => {
  try {
    // Construimos los items para enviarlos al backend
    const items = productosSeleccionados.map(p => ({
      product_name: p.product_name,
      quantity: Number(p.quantity),
      product_price: Number(p.product_price)
    }));

    const res = await fetch("http://localhost:3000/api/paymentMethod/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });

    const data = await res.json();

    if (!data.init_point) {
      console.error("init_point no recibido", data);
      return;
    }

    window.location.href = data.init_point;
  } catch (error) {
    console.error("Error al iniciar checkout", error);
  }
};


  const handleCheckoutEfecty = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/payments/efecty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total }),
      });

      const data = await response.json();
      alert(`Tu código de pago en Efecty es: ${data.code}`);

    } catch (error) {
      console.error(error);
      alert("Error generando el código Efecty");
    }
  };

  return (
    <div className="layout">
      <div className="layout-content">
        <h2 className="title">Método de Pago</h2>
        <div className="card">

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {productosSeleccionados?.map((p) => (
              <li
                key={p.id_shopping_cart_item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--color-border)",
                }}>
                <span>{p.product_name}</span>
                <span>
                  {p.quantity} × ${p.product_price}
                </span>
              </li>
            ))}
          </ul>

          <h3
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontSize: "1.2rem",
              fontWeight: "600",
            }}>
            Total a pagar: <strong>${total}</strong>
          </h3>

          <button
            className="button"
            style={{ width: "100%", marginTop: "1.5rem" }}
            onClick={handleCheckoutOnline}
          >
            Pagar Online (Mercado Pago)
          </button>

 {/*
// ---------------- Efecty Button ----------------
          <button
            className="button"
            style={{ width: "100%", marginTop: "1.5rem", background: "#333" }}
            onClick={handleCheckoutEfecty}
          >
            Pagar en Efecty
          </button>
*/}

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
