import { FaqModel } from "../models/faqModel.js";

export const getFaqs = async (req, res) => {
  try {
    const faqs = await FaqModel.getAllFaqs();
    res.status(200).json(faqs);
  } catch (error) {
    console.error("Error obteniendo FAQs:", error);
    res.status(500).json({ message: "Error al obtener las preguntas frecuentes" });
  }
};

