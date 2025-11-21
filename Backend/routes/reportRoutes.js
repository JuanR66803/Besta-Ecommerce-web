import express from "express";
import { ReportController } from "../controllers/reportController.js";

const router = express.Router();
const reportController = new ReportController();

router.get("/overview", reportController.getOverview);

export default router;
