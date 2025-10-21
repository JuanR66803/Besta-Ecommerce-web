import AuthService from "../services/authService";
import bcrypt from "bcryptjs";

const authService = new AuthService();

export class AuthController {
    // método para registrar un usuario
    async registerUser(req, res) {
        try {
            const { fullname, email, password, birthDate, phone } = req.body;
            if (!fullname || !email || !password || !birthDate || !phone) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await authService.registerUser(fullname, email, hashedPassword, birthDate, phone);
            return res.status(201).json(newUser);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}
