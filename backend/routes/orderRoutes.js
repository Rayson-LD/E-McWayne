import express from "express";
import Order from '../models/orderModel.js'
import { protect } from "../middleware/authMiddleware.js";
const Orderrouter = express.Router()
//@desc - router for getting products from mongoose product model as all products or single product
Orderrouter.post('/',protect,async(req,res)=>{
    
        const {
            shippingAddress,
            orderItems,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,

        } = req.body;
        if(orderItems && orderItems.length === 0)
        {
            res.status(400).json({message:'No orders Found'})
        }
        else{
            const order = new Order({
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
            res.status(201).json(createOrder)
        }
    
})
export default Orderrouter