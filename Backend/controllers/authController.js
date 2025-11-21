import AuthService from "../services/authService.js";
import { GenderService } from "../services/genderServices.js";
import { RoleService } from "../services/roleServices.js";
import { UserAddressService } from "../services/userAddressServices.js";
import jwt from "jsonwebtoken";

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

            const findEmailUser = await authService.getUserByEmail(email);
            console.log("busqueda por email", findEmailUser);

            if (findEmailUser) {
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
            const registerDate = new Date();
            console.log("fechas:", registerDate, birthDate);

            const newUser = await authService.registerUser(
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

    async LoginUser(req, res) {
        try {
            console.log("Recibiendo solicitud de inicio de sesión:", req.body);

            const { email, password } = req.body;

            if (!email || !password) {
                console.warn("Datos incompletos:", { email, password });
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }

            const user = await authService.getUserByEmail(email);
            console.log("Usuario encontrado:", user);

            if (!user) {
                console.warn("Usuario no encontrado:", email);
                return res.status(401).json({ message: "Credenciales incorrectas." });
            }

            const passwordMatch = await bcrypt.compare(password, user.user_password);
            console.log("Comparación de contraseña:", passwordMatch);

            if (!passwordMatch) {
                console.warn("Contraseña incorrecta para:", email);
                return res.status(401).json({ message: "Credenciales incorrectas." });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            console.log("token generado:", token);

            res.status(200).json({ message: "Inicio de sesión exitoso", token, user });

        } catch (error) {
            console.error("Error en el inicio de sesión:", error);

            res.status(500).json({
                message: "Error en el servidor",
                error: error.message,
                stack: error.stack
            });
        }
    }

    async verifyAdmin(req, res) {
        try {
            // req.user viene del middleware verifyToken
            const email = req.user?.email;
            if (!email) return res.status(400).json({ allowed: false, message: 'No se proporcionó email en token' });

            const user = await authService.getUserByEmail(email);
            if (!user) return res.status(404).json({ allowed: false, message: 'Usuario no encontrado' });

            // Comprueba que el correo coincida con el admin específico
            const adminEmail = 'juancrg2004@hotmail.com';
            const isAdminEmail = (user.email && user.email.toLowerCase() === adminEmail.toLowerCase());

            if (isAdminEmail) {
                return res.status(200).json({ allowed: true, user });
            }

            return res.status(403).json({ allowed: false, message: 'No autorizado' });
        } catch (error) {
            console.error('Error en verifyAdmin:', error);
            return res.status(500).json({ allowed: false, message: 'Error del servidor' });
        }
    }
}
