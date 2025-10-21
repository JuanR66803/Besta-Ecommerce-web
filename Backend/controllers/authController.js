import AuthService from "../services/authService.js";
import {GenderService} from "../services/genderServices.js";
import { RoleService } from "../services/roleServices.js";
import { UserAddressService } from "../services/userAddressServices.js";

import bcrypt from "bcryptjs";

const authService = new AuthService();
const genderService = new GenderService();
const roleService = new RoleService();
const userAddressService = new UserAddressService();

export default class AuthController {
    // método para registrar un usuario
    async registerUser(req, res) {
        try {
            const { fullname, email, password, birthDate, phone } = req.body;
            if (!fullname || !email || !password || !birthDate || !phone) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }
            const findEmailUser = authService.getUserByEmail(email);

            if(findEmailUser){
                return res.status(409).json({ message: "El correo ya está registrado" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const gender = "no definido";
            const role = "user";
            const findGender = await genderService.getGenderByName(gender);
            const findRole = await roleService.getRoleByName(role);
            const newUserAddress = await userAddressService.createUserAddress(null, null, null, null, null);
            const genderId = findGender.id_gender;
            const roleId = findRole.id_role;
            const userAddressId = newUserAddress.id_user_address;
            console.log("ids",genderId,roleId,userAddressId) // ver id de manera asincrona

            const newUser = await authService.registerUser(fullname, email, hashedPassword,userAddressId,phone,genderId, birthDate,roleId);
            return res.status(201).json(newUser, "usuario registrado correctamente");
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    async LoginUser(req,res){
        
    }
}
