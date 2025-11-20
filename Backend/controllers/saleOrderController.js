import { SaleOrderService } from "../services/saleOrderServices.js";

    const saleOrderService = new SaleOrderService();

export class SaleOrderController{

    //metodo para crear una orden de venta
    async createSaleOrder(req,res){
        const {id_payment_method, total_price, creation_date}= req.body;
        if (!id_payment_method || !total_price || !creation_date ) {
        return res.status(400).json({ message: "todos los datos son obligatorios" });
        }
        const newSaleOrder= await saleOrderService.createSaleOrder(id_payment_method, total_price, creation_date);
        res.status(201).json(newSaleOrder)
    };

    //metodo para actualizar una orden de venta
    async updateSaleOrder(req,res){
        const {id_sale_order, id_payment_method, total_price, creation_date} = req.body;
        if (!id_sale_order || !id_payment_method || !total_price || !creation_date){
            return res.status(400).json({ message: "todos los datos son obligatorios " });
        }
        const updateSaleOrder = await saleOrderService.updateSaleOrder(id_sale_order, id_payment_method, total_price, creation_date)
        res.status(204).json(updateSaleOrder)
    };

    //metodo para eliminar una orden de venta
    async deleteSaleOrderById(req,res){
        const {id_sale_order} = req.body;
        if (!id_sale_order ){
            return res.status(400).json({ message: "todos los datos son obligatorios " });
        }
        const deleteSaleOrder = await saleOrderService.deleteSaleOrderById(id_sale_order)
        res.status(204).json(deleteSaleOrder)
    };

    //metodo para obtener una orden de venta con su id
    async getSaleOrderById(req,res){
        const {id_sale_order} = req.body;
        if (!id_sale_order ){
            return res.status(400).json({ message: "todos los datos son obligatorios " });
        }
        const getSaleOrderById = await saleOrderService.getSaleOrderById(id_sale_order)
        res.status(200).json(getSaleOrderByIdSaleOrder)
    };

    //metodo para obtener todas las orden de ventas
    async getAllSaleOrders(req,res){
        const getAllSaleOrders = await saleOrderService.getAllSaleOrders();
        res.status(200).json(getAllSaleOrders)
    };
}