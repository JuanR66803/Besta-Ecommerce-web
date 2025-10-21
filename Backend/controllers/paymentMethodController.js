import {PaymentMethodService} from "../services/paymentMethodServices.js";

const paymentMethodService = new PaymentMethodService();

export class PaymentMethodController{

    //metodo para crear un metodo de pago
    async createPaymentMethod(req,res){
        const {method_name}= req.body;
        if (!method_name ) {
        return res.status(400).json({ message: "el  metodo es obligatorio" });
        }
        const newPaymentMethod= await paymentMethodService.createPaymentMethod(method_name);
        res.status(201).json(newPaymentMethod)
    };

    //metodo para actualizar un metodo de pago
    async updatePaymentMethod(req,res){
        const {id_payment_method, method_name} = req.body;
        if (!id_payment_method || !method_name){
            return res.status(400).json({ message: "el id y el metodo es obligatorio " });
        }
        const updatePaymentMethod = await paymentMethodService.updatePaymentMethod(id_payment_method, method_name)
        res.status(204).json(updatePaymentMethod)
    };

    //metodo para eliminar un metodo de pago
    async deletePaymentMethodById(req,res){
        const {id_payment_method} = req.body;
        if (!id_payment_method ){
            return res.status(400).json({ message: "el id del metodo es obligatorio " });
        }
        const deletePaymentMethod = await paymentMethodService.deletePaymentMethodById(id_payment_method)
        res.status(204).json(deletePaymentMethod)
    };

    //metodo para obtener un metodo de pago con su id
    async getPaymentMethodById(req,res){
        const {id_payment_method} = req.body;
        if (!id_payment_method ){
            return res.status(400).json({ message: "el id y del metodo es obligatorio " });
        }
        const getPaymentMethodById = await paymentMethodService.getPaymentMethodById(id_payment_method)
        res.status(200).json(getPaymentMethodById)
    };

    //metodo para obtener todas las categorias
    async getAllPaymentMethods(req,res){
        const getAllPaymentMethods = await paymentMethodService.getAllPaymentMethods();
        res.status(200).json(getAllPaymentMethods)
    };
}