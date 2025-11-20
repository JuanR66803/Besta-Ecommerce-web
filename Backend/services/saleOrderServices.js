import {SaleOrderModel} from "../models/saleOrderModel.js" ;

const saleOrderModel = new SaleOrderModel();

export class SaleOrderService{
    
    //metodo para crear una orden de venta
    async createSaleOrder(id_payment_method, total_price, creation_date){
        // se crea la categoría sin comprobar si ya existe, hay que agregar un condicional
        return (await saleOrderModel.createSaleOrder(id_payment_method, total_price, creation_date));
    };

    //metodo para acrualizar una orden de vent
    async updateSaleOrder(id_sale_order, id_payment_method, total_price, creation_date){
        return (await saleOrderModel.updateSaleOrderById(id_sale_order, id_payment_method, total_price, creation_date));
    };

    //metodo para eliminar una orden de venta
    async deleteSaleOrderById(id_sale_order){
        return (await saleOrderModel.deleteSaleOrderById(id_sale_order));
    };

    //metodo para obtener una orden de venta con su id
    async getSaleOrderById(id_sale_order){
        return (await saleOrderModel.getSaleOrderById(id_sale_order));
    };

    //metodo para obtener todas las orden de ventas
    async getAllSaleOrders(){
        return (await saleOrderModel.getAllSaleOrders())
    };
}

