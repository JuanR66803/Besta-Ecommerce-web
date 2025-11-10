import express from "express";
import { getFaqs } from "../controllers/faqController.js";

const router = express.Router();

router.get("/", getFaqs);

export default router;
