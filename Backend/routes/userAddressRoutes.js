import express from "express";
import {UserAddressController} from "../controllers/userAddressController.js";

const userAddressController = new UserAddressController();

const router = express.Router();
router.post("/createUserAddress", userAddressController.createUserAddress);
router.put("/updateUserAddressById", userAddressController.updateUserAddress);
router.delete("/deleteUserAddressById", userAddressController.deleteUserAddressById);
router.get("/getAllUserAddresses", userAddressController.getAllUserAddresses);
router.get("/getUserAddressById", userAddressController.getUserAddressById);

export default router;
