import { ReportModel } from "../models/reportModel.js";

const reportModel = new ReportModel();

const toNumber = value => Number(value ?? 0);

export class ReportService {
  async getOverview() {
    const [
      revenueSummary,
      salesByMonth,
      paymentMethods,
      topProducts,
      lowStockCount,
      lowStockProducts,
      totalUsers,
      usersByRole,
      usersByCity,
      wishlistLeaders,
      wishlistCount,
      cartSummary,
    ] = await Promise.all([
      reportModel.getRevenueSummary(),
      reportModel.getSalesByMonth(),
      reportModel.getPaymentMethodBreakdown(),
      reportModel.getTopProducts(),
      reportModel.getLowStockCount(),
      reportModel.getLowStockProducts(),
      reportModel.getTotalUsers(),
      reportModel.getUsersByRole(),
      reportModel.getUsersByCity(),
      reportModel.getWishlistSummary(),
      reportModel.getWishlistCount(),
      reportModel.getCartSummary(),
    ]);

    return {
      kpis: {
        revenueLast30Days: toNumber(revenueSummary?.total_revenue),
        ordersLast30Days: toNumber(revenueSummary?.total_orders),
        avgTicketLast30Days: toNumber(revenueSummary?.avg_ticket),
        outOfStockSkus: toNumber(lowStockCount?.qty),
        totalUsers: toNumber(totalUsers?.qty),
        wishlistItems: toNumber(wishlistCount?.qty),
      },
      salesByMonth: salesByMonth.map(item => ({
        label: item.label,
        total: toNumber(item.total),
      })),
      paymentMethods: paymentMethods.map(item => ({
        method: item.method_name,
        orders: toNumber(item.orders),
        total: toNumber(item.total),
      })),
      topProducts: topProducts.map(item => ({
        name: item.product_name,
        units: toNumber(item.units),
        total: toNumber(item.total),
      })),
      lowStockProducts: lowStockProducts.map(item => ({
        name: item.product_name,
        stock: toNumber(item.stock),
      })),
      usersByRole: usersByRole.map(item => ({
        label: item.role_name,
        qty: toNumber(item.qty),
      })),
      usersByCity: usersByCity.map(item => ({
        label: item.city,
        qty: toNumber(item.qty),
      })),
      wishlistLeaders: wishlistLeaders.map(item => ({
        name: item.product_name,
        qty: toNumber(item.qty),
      })),
      cartSummary: {
        carts: toNumber(cartSummary?.carts),
        totalValue: toNumber(cartSummary?.total_value),
        staleCarts: toNumber(cartSummary?.stale_carts),
      },
    };
  }
}
