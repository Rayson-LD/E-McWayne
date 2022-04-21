import express from "express";
import orderModel from '../models/orderModel.js'
import { protect } from "../middleware/authMiddleware.js";
const Orderrouter = express.Router()
//@desc - router for getting products from mongoose product model as all products or single product
Orderrouter.post('/',protect,async(req,res)=>{
    try {
        const {
            shippingAddress,
            cartItems,
            paymentMethod,
            ItemsPrice,
            shippingPrice,
            Tax,
            Total,

        } = req.body;
       const order = new orderModel({
           user:req.user.id,
        shippingAddress,
        orderItems:cartItems,
        paymentMethod,
        itemsPrice:ItemsPrice,
        shippingPrice:shippingPrice,
        taxPrice:Tax,
        totalPrice:Total,
       })
        const createOrder = await order.save()
    } catch (error) {
        res.status(400).json({message:"Order not Available"})
    }

})
export default Orderrouter