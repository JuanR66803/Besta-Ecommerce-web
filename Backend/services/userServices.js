import { UserModel } from "../models/userModel.js";

const userModel = new UserModel();

export default class UserService {
    //metodo para registrar un usuario
    async registerUser(fullname, email, hashedPassword,userAddressId,phone,genderId, birthDate,roleId,registerDate) {
        // se crea el usuario sin comprobar si ya existe, hay que agregar un condicional
        return await userModel.createUser(fullname, email, hashedPassword,userAddressId,phone,genderId, birthDate,roleId,registerDate);
    }
    //metodo para obtener un usuario por su email
    async getAllUsers() {
        return await userModel.getAllUsers();
    }
    async getUserByEmail(email) {
        return await userModel.getUserByEmail(email);
    }
}