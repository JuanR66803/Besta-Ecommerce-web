import express from "express";
import {RoleController} from "../controllers/roleController.js";

const roleController = new RoleController();

const router = express.Router();
router.post("/createRole", roleController.createRole);
router.put("/updateRoleById", roleController.updateRole);
router.delete("/deleteRoleById", roleController.deleteRoleById);
router.get("/getAllRoles", roleController.getAllRoles);
router.get("/getRoleById", roleController.getRoleById);

export default router;
