import { ReportService } from "../services/reportService.js";

const reportService = new ReportService();

export class ReportController {
  async getOverview(req, res) {
    try {
      const overview = await reportService.getOverview();
      res.status(200).json(overview);
    } catch (error) {
      console.error("Error al obtener los reportes:", error);
      res.status(500).json({
        message: "Error al obtener los reportes",
        error: error.message,
      });
    }
  }
}
