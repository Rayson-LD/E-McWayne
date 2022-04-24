import express from "express";
import Order from '../models/orderModel.js'
import { protect } from "../middleware/authMiddleware.js";
import axios from "axios";
const Orderrouter = express.Router()
//@desc - router for adding order from front end to mongoose db 
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

//@desc - router for adding order from front end to mongoose db 
Orderrouter.get('/:id',protect,async(req,res)=>{
    
   const order = await Order.findById(req.params.id)
   if(order)
   {
      return res.json(order)
   }
   else{
       res.status(400).json({message:'Orders No Found'})
   }

})

//@desc - router for adding payment info from payment page to mongoose db 
Orderrouter.put('/:id/pay',protect,async(req,res)=>{
    
    const order = await Order.findById(req.params.id)
    if(order)
    {
        order.isPaid = true
        order.paidAt=Date.now()
        order.paymentResult= {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
          }
          const updatePayment = await order.save()
          return res.status(201).json(updatePayment)
    }
    else{
        res.status(400).json({message:'Payment was not successfull. Check your Details'})
    }
 
 })
export default Orderrouter