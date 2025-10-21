import { SaleOrderItemService } from "../services/saleOrderItemServices";

    const saleOrderItemService = new SaleOrderItemService();

export class SaleOrderItemController{

    //metodo para crear un item de la orden de venta
    async createSaleOrderItem(req,res){
        const {id_product_details, id_sale_order, product_price, partial_price, quantity}= req.body;
        if (!id_product_details || !id_sale_order || !product_price || !partial_price || !quantity ) {
        return res.status(400).json({ message: "todos los campos son obligatorios" });
        }
        const newSaleOrderItem= await saleOrderItemService.createSaleOrderItem(id_product_details, id_sale_order, product_price, partial_price, quantity);
        res.status(201).json(newSaleOrderItem)
    };

    //metodo para actualizar un item de la orden de venta
    async updateSaleOrderItem(req,res){
        const {id_sale_order_item, id_product_details, id_sale_order, product_price, partial_price, quantity} = req.body;
        if (!id_sale_order_item || !id_product_details || !id_sale_order || !product_price || !partial_price || !quantity){
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const updateSaleOrderItem = await saleOrderItemService.updateSaleOrderItem(id_sale_order_item, id_product_details, id_sale_order, product_price, partial_price, quantity)
        res.status(204).json(updateSaleOrderItem)
    };

    //metodo para eliminar un item de la orden de venta
    async deleteSaleOrderItemById(req,res){
        const {id_sale_order_item} = req.body;
        if (!id_sale_order_item ){
            return res.status(400).json({ message: "todos los campos son obligatorios " });
        }
        const deleteSaleOrderItem = await saleOrderItemService.deleteSaleOrderItemById(id_sale_order_item)
        res.status(204).json(deleteSaleOrderItem)
    };

    //metodo para obtener un item de la orden de venta con su id
    async getSaleOrderItemById(req,res){
        const {id_sale_order_item} = req.body;
        if (!id_sale_order_item ){
            return res.status(400).json({ message: "todos los campos son obligatorios" });
        }
        const getSaleOrderItemById = await saleOrderItemService.getSaleOrderItemById(id_sale_order_item)
        res.status(200).json(getSaleOrderItemByIdSaleOrderItem)
    };

    //metodo para obtener todas las sub categorias
    async getAllSaleOrderItems(req,res){
        const getAllSaleOrderItems = await saleOrderItemService.getAllSaleOrderItems();
        res.status(200).json(getAllSaleOrderItems)
    };
}