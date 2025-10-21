import {PaymentMethodModel} from "../models/paymentMethodModel.js"

const paymentMethodModel = new PaymentMethodModel() 

export class PaymentMethodService{

    //metodo para crear un metodo de pago
    async createPaymentMethod(method_name){
        // se crea el metodo de pago sin comprobar si ya existe, hay que agregar un condicional
        return (await paymentMethodModel.createPaymentMethod(method_name));
    };

    //metodo para actualizar un metodo de pago
    async updatePaymentMethod(id_payment_method,method_name){
        return (await paymentMethodModel.updatePaymentMethodById(id_payment_method, method_name));
    };

    //metodo para eliminar un metodo de pago
    async deletePaymentMethodById(id_payment_method){
        return (await paymentMethodModel.deletePaymentMethodById(id_payment_method));
    };

    //metodo para obtener un metodo de pago con su id
    async getPaymentMethodById(id_payment_method){
        return (await paymentMethodModel.getPaymentMethodById(id_payment_method));
    };

    //metodo para obtener todos los metodos de pago
    async getAllPaymentMethods(){
        return (await paymentMethodModel.getAllPaymentMethods())
    };
}