import { UserModel } from "../models/userModel.js";

const userModel = new UserModel();

export default class AuthService {
    //metodo para registrar un usuario
    async registerUser(fullname, email, password, birthDate, phone) {
        // se crea el usuario sin comprobar si ya existe, hay que agregar un condicional
        return await userModel.createUser(fullname, email, password, birthDate, phone);
    }
    //metodo para obtener un usuario por su email
    async getUserByEmail(email) {
        return await userModel.getUserByEmail(email);
    }
}