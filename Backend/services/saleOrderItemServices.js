import {SaleOrderItemModel} from "../models/saleOrderItemModel.js" ;

const saleOrderItemModel = new SaleOrderItemModel();

export class SaleOrderItemService{
    
    //metodo para crear una sub categoria
    async createSaleOrderItem(id_product_details, id_sale_order, product_price, partial_price, quantity){
        // se crea el item de la orden de venta sin comprobar si ya existe, hay que agregar un condicional
        return (await saleOrderItemModel.createSaleOrderItem(id_product_details, id_sale_order, product_price, partial_price, quantity));
    };

    //metodo para acrualizar una sub categoria
    async updateSaleOrderItem(id_sale_order_item, id_product_details, id_sale_order, product_price, partial_price, quantity){
        return (await saleOrderItemModel.updateSaleOrderItemById(id_sale_order_item, id_product_details, id_sale_order, product_price, partial_price, quantity));
    };

    //metodo para eliminar una sub categoria
    async deleteSaleOrderItemById(id_sale_oder_item){
        return (await saleOrderItemModel.deleteSaleOrderItemById(id_sale_oder_item));
    };

    //metodo para obtener una sub categoria con su id
    async getSaleOrderItemById(id_sale_oder_item){
        return (await saleOrderItemModel.getSaleOrderItemById(id_sale_oder_item));
    };

    //metodo para obtener todas las sub categorias
    async getAllSaleOrderItems(){
        return (await saleOrderItemModel.getAllSaleOrderItems())
    };
}

