import express from "express";
import orderModel from '../models/orderModel.js'
import { protect } from "../middleware/authMiddleware.js";
const Orderrouter = express.Router()
//@desc - router for getting products from mongoose product model as all products or single product
Orderrouter.post('/',protect,async(req,res)=>{
    try {
        const {
            shippingAddress,
            orderItems,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,

        } = req.body;
       const order = new orderModel({
           user:req.user.id,
        shippingAddress,
        orderItems,
        paymentMethod,
        itemsPrice,
        shippingPrice:shippingPrice,
        taxPrice,
        totalPrice,
       })
        const createOrder = await order.save()
    } catch (error) {
        console.log(error)
    }

})
export default Orderrouter