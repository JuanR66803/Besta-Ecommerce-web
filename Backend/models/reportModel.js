import pool from "../config/db.js";

export class ReportModel {
  async getRevenueSummary() {
    const query = `
      SELECT
        COALESCE(SUM(total_price), 0) AS total_revenue,
        COUNT(*) AS total_orders,
        COALESCE(AVG(total_price), 0) AS avg_ticket
      FROM sale_order
      WHERE creation_date >= NOW() - INTERVAL '30 days';
    `;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async getSalesByMonth(limit = 6) {
    const query = `
      SELECT
        DATE_TRUNC('month', creation_date) AS month_date,
        TO_CHAR(DATE_TRUNC('month', creation_date), 'Mon YYYY') AS label,
        COALESCE(SUM(total_price), 0) AS total
      FROM sale_order
      GROUP BY month_date
      ORDER BY month_date DESC
      LIMIT $1;
    `;
    const { rows } = await pool.query(query, [limit]);
    return rows;
  }

  async getPaymentMethodBreakdown() {
    const query = `
      SELECT
        pm.method_name,
        COUNT(*) AS orders,
        COALESCE(SUM(so.total_price), 0) AS total
      FROM sale_order so
      INNER JOIN payment_method pm ON pm.id_payment_method = so.id_payment_method
      GROUP BY pm.method_name
      ORDER BY total DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async getTopProducts(limit = 5) {
    const query = `
      SELECT
        p.product_name,
        COALESCE(SUM(soi.quantity), 0) AS units,
        COALESCE(SUM(soi.partial_price), 0) AS total
      FROM sale_order_item soi
      INNER JOIN product_details pd ON pd.id_product_details = soi.id_product_details
      INNER JOIN product p ON p.id_product = pd.id_product
      GROUP BY p.product_name
      ORDER BY total DESC
      LIMIT $1;
    `;
    const { rows } = await pool.query(query, [limit]);
    return rows;
  }

  async getLowStockCount() {
    const query = `
      SELECT COUNT(*) AS qty
      FROM product_details
      WHERE stock <= 0;
    `;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async getLowStockProducts(limit = 5) {
    const query = `
      SELECT
        p.product_name,
        pd.stock
      FROM product_details pd
      INNER JOIN product p ON p.id_product = pd.id_product
      WHERE pd.stock <= 5
      ORDER BY pd.stock ASC
      LIMIT $1;
    `;
    const { rows } = await pool.query(query, [limit]);
    return rows;
  }

  async getTotalUsers() {
    const query = `
      SELECT COUNT(*) AS qty
      FROM users;
    `;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async getUsersByRole() {
    const query = `
      SELECT
        r.role_name,
        COUNT(*) AS qty
      FROM users u
      INNER JOIN role r ON r.id_role = u.id_role
      GROUP BY r.role_name
      ORDER BY qty DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async getUsersByCity(limit = 5) {
    const query = `
      SELECT
        ua.city,
        COUNT(*) AS qty
      FROM users u
      INNER JOIN user_address ua ON ua.id_user_address = u.id_user_address
      GROUP BY ua.city
      ORDER BY qty DESC
      LIMIT $1;
    `;
    const { rows } = await pool.query(query, [limit]);
    return rows;
  }

  async getWishlistSummary(limit = 5) {
    const query = `
      SELECT
        p.product_name,
        COUNT(*) AS qty
      FROM wish_list_products w
      INNER JOIN product_details pd ON pd.id_product_details = w.id_product_details
      INNER JOIN product p ON p.id_product = pd.id_product
      GROUP BY p.product_name
      ORDER BY qty DESC
      LIMIT $1;
    `;
    const { rows } = await pool.query(query, [limit]);
    return rows;
  }

  async getWishlistCount() {
    const query = `
      SELECT COUNT(*) AS qty
      FROM wish_list_products;
    `;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async getCartSummary() {
    const query = `
      SELECT
        COUNT(*) AS carts,
        COALESCE(SUM(total_price), 0) AS total_value,
        COUNT(*) FILTER (WHERE modification_date < NOW() - INTERVAL '7 days') AS stale_carts
      FROM shopping_cart;
    `;
    const { rows } = await pool.query(query);
    return rows[0];
  }
}
