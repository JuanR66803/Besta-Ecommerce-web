import express from "express";
import {SubCategoryController} from "../controllers/subCategoryController.js";

const subCategoryController = new SubCategoryController();

const router = express.Router();
router.post("/createSubCategory", subCategoryController.createSubCategory);
router.put("/updateSubCategoryById", subCategoryController.updateSubCategory);
router.delete("/deleteSubCategoryById", subCategoryController.deleteSubCategoryById);
router.get("/getAllSubCategories", subCategoryController.getAllSubCategories);
router.get("/getSubCategoryById", subCategoryController.getSubCategoryById);

export default router;