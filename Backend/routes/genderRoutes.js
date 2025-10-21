import express from "express";
import {GenderController} from "../controllers/genderController.js";

const genderController = new GenderController();

const router = express.Router();
router.post("/createGender", genderController.createGender);
router.put("/updateGenderById", genderController.updateGender);
router.delete("/deleteGenderById", genderController.deleteGenderById);
router.get("/getAllGenders", genderController.getAllGenders);
router.get("/getGenderById", genderController.getGenderById);

export default router;
