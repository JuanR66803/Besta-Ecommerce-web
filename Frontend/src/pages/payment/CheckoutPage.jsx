import { useLocation } from "react-router-dom";
import "./CheckoutPages.css";

function CheckoutPage() {
  const { state } = useLocation();
  const { productosSeleccionados, total } = state || {};

  const handleCheckout = async () => {
    const response = await fetch("http://localhost:3000/api/payments/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: productosSeleccionados.map((p) => ({
          title: p.product_name,
          quantity: p.quantity,
          price: Number(p.product_price),
        })),
        total,
      }),
    });

    const data = await response.json();
    window.location.href = data.init_point;
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
                  borderBottom: "1px solid var(--color-border)"
                }}
              >
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
              fontWeight: "600"
            }}
          >
            Total a pagar: <strong>${total}</strong>
          </h3>

          <button className="button" style={{ width: "100%", marginTop: "1.5rem" }} onClick={handleCheckout}>
            Pagar con Mercado Pago
          </button>
        </div>

      </div>
    </div>
  );
}

export default CheckoutPage;
