import { useEffect, useMemo, useState } from "react";
import "./PanelReports.css";
import {
  FaChartLine,
  FaBoxes,
  FaUsers,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";

const suggestedQueries = [
  {
    title: "Ventas por categoría y mes",
    goal: "Detectar categorías con mayor crecimiento.",
    sql: `SELECT c.category_name,
       DATE_TRUNC('month', so.creation_date) AS mes,
       SUM(soi.partial_price) AS total
FROM sale_order_item soi
JOIN product_details pd ON pd.id_product_details = soi.id_product_details
JOIN product p ON p.id_product = pd.id_product
JOIN sub_category sc ON sc.id_sub_category = p.id_sub_category
JOIN category c ON c.id_category = sc.id_category
JOIN sale_order so ON so.id_sale_order = soi.id_sale_order
GROUP BY c.category_name, mes
ORDER BY mes DESC, total DESC;`,
  },
  {
    title: "Stock versus demanda",
    goal: "Cruzar ventas vs inventario disponible.",
    sql: `SELECT pd.id_product_details,
       p.product_name,
       pd.stock,
       SUM(soi.quantity) AS ventas_ultimos_30d
FROM product_details pd
LEFT JOIN sale_order_item soi ON soi.id_product_details = pd.id_product_details
LEFT JOIN product p ON p.id_product = pd.id_product
WHERE soi.creation_date >= NOW() - INTERVAL '30 days'
GROUP BY pd.id_product_details, p.product_name, pd.stock
ORDER BY ventas_ultimos_30d DESC;`,
  },
  {
    title: "Usuarios por rol y ciudad",
    goal: "Dimensionar la base por segmento.",
    sql: `SELECT r.role_name,
       ua.city,
       COUNT(*) AS total
FROM users u
JOIN role r ON r.id_role = u.id_role
JOIN user_address ua ON ua.id_user_address = u.id_user_address
GROUP BY r.role_name, ua.city
ORDER BY total DESC;`,
  },
];

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value = 0) =>
  new Intl.NumberFormat("es-CO").format(value);

const PanelReports = () => {
  const API_URL_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL_BASE}/api/reports/overview`);
        if (!response.ok) {
          throw new Error("No se pudieron obtener los reportes");
        }
        const data = await response.json();
        setOverview(data);
      } catch (err) {
        setError(err.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [API_URL_BASE]);

  const kpiCards = useMemo(() => {
    if (!overview) return [];
    return [
      {
        title: "Ingresos últimos 30 días",
        value: formatCurrency(overview.kpis.revenueLast30Days),
        trend: `${formatNumber(
          overview.kpis.ordersLast30Days
        )} órdenes cerradas`,
        helper: `Ticket: ${formatCurrency(
          overview.kpis.avgTicketLast30Days
        )}`,
      },
      {
        title: "Ticket promedio",
        value: formatCurrency(overview.kpis.avgTicketLast30Days),
        trend: "Incluye sólo órdenes confirmadas",
        helper: `${formatNumber(
          overview.kpis.ordersLast30Days
        )} órdenes analizadas`,
      },
      {
        title: "Productos sin stock",
        value: formatNumber(overview.kpis.outOfStockSkus),
        trend: "SKU en 0 unidades",
        helper: "Prioriza reposición",
      },
      {
        title: "Usuarios registrados",
        value: formatNumber(overview.kpis.totalUsers),
        trend: `${formatNumber(
          overview.kpis.wishlistItems
        )} registros en wishlist`,
        helper: "Base total del sistema",
      },
    ];
  }, [overview]);

  const salesByMonth = overview?.salesByMonth ?? [];
  const paymentMethods = overview?.paymentMethods ?? [];
  const topProducts = overview?.topProducts ?? [];
  const lowStockProducts = overview?.lowStockProducts ?? [];
  const usersByRole = overview?.usersByRole ?? [];
  const usersByCity = overview?.usersByCity ?? [];
  const wishlistLeaders = overview?.wishlistLeaders ?? [];
  const cartSummary = overview?.cartSummary;

  return (
    <div className="panel-reports">
      <header className="reports__header">
        <div>
          <p className="reports__eyebrow">Centro estratégico</p>
          <h2>Reportes</h2>
          <p>
            Esta sección se alimenta directamente de la base de datos para
            entregar señales accionables al equipo de operaciones y marketing.
            Los KPI se recalculan cada vez que visites este panel.
          </p>
        </div>
        <MdPayments className="reports__header-icon" />
      </header>

      {loading && (
        <div className="reports__state">Cargando reportes en tiempo real…</div>
      )}
      {error && (
        <div className="reports__state reports__state--error">
          {error}. Verifica que el backend esté en ejecución.
        </div>
      )}

      {overview && (
        <>
          <section className="reports__kpi-grid">
            {kpiCards.map(card => (
              <article key={card.title} className="reports__kpi-card">
                <p className="reports__kpi-label">{card.title}</p>
                <strong className="reports__kpi-value">{card.value}</strong>
                <span className="reports__kpi-trend">{card.trend}</span>
                <p className="reports__kpi-source">{card.helper}</p>
              </article>
            ))}
          </section>

          <section className="reports__grid">
            <article className="reports__card">
              <div className="reports__card-head">
                <span className="reports__icon">
                  <FaChartLine />
                </span>
                <div>
                  <h3>Ventas y Pagos</h3>
                  <p>Órdenes procesadas y métodos preferidos.</p>
                </div>
              </div>
              <div className="reports__stat-list">
                <h4>Ingresos por mes</h4>
                <ul>
                  {salesByMonth.map(item => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{formatCurrency(item.total)}</strong>
                    </li>
                  ))}
                  {!salesByMonth.length && (
                    <li>
                      <span>Sin registros</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="reports__stat-list">
                <h4>Métodos de pago</h4>
                <ul>
                  {paymentMethods.map(method => (
                    <li key={method.method}>
                      <span>{method.method}</span>
                      <strong>{formatCurrency(method.total)}</strong>
                      <small>{formatNumber(method.orders)} órdenes</small>
                    </li>
                  ))}
                  {!paymentMethods.length && (
                    <li>
                      <span>Aún no hay pagos registrados</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="reports__stat-list">
                <h4>Top productos</h4>
                <ul>
                  {topProducts.map(product => (
                    <li key={product.name}>
                      <span>{product.name}</span>
                      <strong>{formatNumber(product.units)} uds.</strong>
                      <small>{formatCurrency(product.total)}</small>
                    </li>
                  ))}
                  {!topProducts.length && (
                    <li>
                      <span>Sin ventas registradas</span>
                    </li>
                  )}
                </ul>
              </div>
            </article>

            <article className="reports__card">
              <div className="reports__card-head">
                <span className="reports__icon">
                  <FaBoxes />
                </span>
                <div>
                  <h3>Inventario y catálogo</h3>
                  <p>Control de SKU críticos.</p>
                </div>
              </div>
              <div className="reports__tables">
                <p>SKU con menos de 5 unidades</p>
              </div>
              <ul className="reports__list">
                {lowStockProducts.map(product => (
                  <li key={product.name}>
                    <strong>{product.name}</strong>
                    <p>Stock: {formatNumber(product.stock)}</p>
                  </li>
                ))}
                {!lowStockProducts.length && (
                  <li>
                    <strong>Inventario saludable</strong>
                    <p>No hay alertas de stock bajo.</p>
                  </li>
                )}
              </ul>
            </article>

            <article className="reports__card">
              <div className="reports__card-head">
                <span className="reports__icon">
                  <FaUsers />
                </span>
                <div>
                  <h3>Usuarios y comportamiento</h3>
                  <p>Segmentación por roles y ciudades.</p>
                </div>
              </div>
              <div className="reports__stat-list">
                <h4>Roles</h4>
                <ul>
                  {usersByRole.map(role => (
                    <li key={role.label}>
                      <span>{role.label}</span>
                      <strong>{formatNumber(role.qty)}</strong>
                    </li>
                  ))}
                  {!usersByRole.length && (
                    <li>
                      <span>Aún no hay usuarios</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="reports__stat-list">
                <h4>Ciudades principales</h4>
                <ul>
                  {usersByCity.map(city => (
                    <li key={city.label}>
                      <span>{city.label}</span>
                      <strong>{formatNumber(city.qty)}</strong>
                    </li>
                  ))}
                  {!usersByCity.length && (
                    <li>
                      <span>No hay direcciones registradas</span>
                    </li>
                  )}
                </ul>
              </div>
            </article>

            <article className="reports__card">
              <div className="reports__card-head">
                <span className="reports__icon">
                  <FaShoppingCart />
                </span>
                <div>
                  <h3>Carrito y Wishlist</h3>
                  <p>Conversión y productos favoritos.</p>
                </div>
              </div>
              <div className="reports__meta-grid">
                <div>
                  <p className="reports__eyebrow">Carritos guardados</p>
                  <strong>{formatNumber(cartSummary?.carts ?? 0)}</strong>
                </div>
                <div>
                  <p className="reports__eyebrow">Valor acumulado</p>
                  <strong>{formatCurrency(cartSummary?.totalValue ?? 0)}</strong>
                </div>
                <div>
                  <p className="reports__eyebrow">Carritos inactivos</p>
                  <strong>{formatNumber(cartSummary?.staleCarts ?? 0)}</strong>
                </div>
              </div>
              <div className="reports__stat-list">
                <h4>Favoritos</h4>
                <ul>
                  {wishlistLeaders.map(product => (
                    <li key={product.name}>
                      <span>{product.name}</span>
                      <strong>{formatNumber(product.qty)} usuarios</strong>
                    </li>
                  ))}
                  {!wishlistLeaders.length && (
                    <li>
                      <span>No hay productos en wishlist</span>
                    </li>
                  )}
                </ul>
              </div>
            </article>
          </section>
        </>
      )}

      <section className="reports__queries">
        <div className="reports__queries-head">
          <FaHeart />
          <div>
            <h3>Consultas sugeridas</h3>
            <p>SQL de referencia para iniciar el modelado analítico.</p>
          </div>
        </div>
        <div className="reports__queries-grid">
          {suggestedQueries.map(query => (
            <article key={query.title} className="reports__query-card">
              <h4>{query.title}</h4>
              <p>{query.goal}</p>
              <pre>
                <code>{query.sql}</code>
              </pre>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PanelReports;
