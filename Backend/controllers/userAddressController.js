import { UserAddressService } from "../services/userAddressServices";

    const userAddressService = new UserAddressService();

export class UserAddressController{

    //metodo para crear una orden de venta
    async createUserAddress(req,res){
        const {address_name, address, city, postal_code, details}= req.body;
        if (!address_name || !address || !city || !postal_code || !details) {
        return res.status(400).json({ message: "todos los datos son obligatorios" });
        }
        const newUserAddress= await userAddressService.createUserAddress(address_name, address, city, postal_code, details);
        res.status(201).json(newUserAddress)
    };

    //metodo para actualizar una orden de venta
    async updateUserAddress(req,res){
        const {id_user_address, address_name, address, city, postal_code, details} = req.body;
        if (!id_user_address || !address_name || !address || !city || !postal_code || !details){
            return res.status(400).json({ message: "todos los datos son obligatorios " });
        }
        const updateUserAddress = await userAddressService.updateUserAddress(id_user_address, address_name, address, city, postal_code, details)
        res.status(204).json(updateUserAddress)
    };

    //metodo para eliminar una orden de venta
    async deleteUserAddressById(req,res){
        const {id_sale_order} = req.body;
        if (!id_sale_order ){
            return res.status(400).json({ message: "todos los datos son obligatorios " });
        }
        const deleteUserAddress = await userAddressService.deleteUserAddressById(id_sale_order)
        res.status(204).json(deleteUserAddress)
    };

    //metodo para obtener una orden de venta con su id
    async getUserAddressById(req,res){
        const {id_sale_order} = req.body;
        if (!id_sale_order ){
            return res.status(400).json({ message: "todos los datos son obligatorios " });
        }
        const getUserAddressById = await userAddressService.getUserAddressById(id_sale_order)
        res.status(200).json(getUserAddressByIdUserAddress)
    };

    //metodo para obtener todas las orden de ventas
    async getAllUserAddresses(req,res){
        const getAllUserAddresss = await userAddressService.getAllUserAddresses();
        res.status(200).json(getAllUserAddresss)
    };
}