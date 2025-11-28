import { GenderService } from "../services/genderServices.js";
import { RoleService } from "../services/roleServices.js";
import { UserAddressService } from "../services/userAddressServices.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import UserService from "../services/userServices.js";

const userService = new UserService();
const genderService = new GenderService();
const roleService = new RoleService();
const userAddressService = new UserAddressService();

export default class UserController {
    // método para registrar un usuario
    async registerUser(req, res) {
        try {
            const { fullname, email, password, birthDate, phone,address_name, address, city, postal_code, details,role, gender} = req.body;
            

            if (!fullname || !email || !password || !birthDate || !phone || !address_name || !address || !city || !postal_code) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }

            const findEmailUser = await userService.getUserByEmail(email);
            console.log("busqueda por email", findEmailUser);

            if (findEmailUser) {
                return res.status(409).json({ message: "El correo ya está registrado" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const findGender = await genderService.getGenderByName(gender);
            const findRole = await roleService.getRoleByName(role);
            const newUserAddress = await userAddressService.createUserAddress(address_name, address, city, postal_code, details);

            const genderId = findGender.id_gender;
            const roleId = findRole.id_role;
            const userAddressId = newUserAddress.id_user_address;
            const registerDate = new Date();
            console.log("fechas:", registerDate, birthDate);

            const newUser = await userService.registerUser(
                fullname,
                email,
                hashedPassword,
                userAddressId,
                phone,
                genderId,
                birthDate,
                roleId,
                registerDate
            );
            console.log("Nuevo usuario registrado:", newUser);

            return res.status(201).json({ message: "Usuario registrado correctamente", newUser });

        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }    
    }
}
