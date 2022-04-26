import express from "express";
import Product from "../models/productModel.js";
import { protect } from "../middleware/authMiddleware.js";
const Productrouter = express.Router()
//@desc - router for getting products from mongoose product model as all products or single product
Productrouter.get('/',async(req,res)=>{
    const keyword = req.query.keyword?{
        name:{
            $regex:req.query.keyword, //regression shud give d product with lim inputs
            $options:'i' //case sensitive
         }
    }:{}
    try {
        const p = await Product.find({...keyword});
       
        res.json(p)
    } catch (error) {
        res.status(400).json({message:"Products not available"})
    }

})

//single product
Productrouter.get('/:id',async(req,res)=>{
    try {
        const p = await Product.findById(req.params.id);
       
            res.json(p)
        
        
            
    } catch (error) {
        res.status(400).json({message:"Product not found"})
    }

})
Productrouter.post('/:id/reviews',protect,async(req,res)=>{

    try {
        const {rating,comment} = req.body
        const p = await Product.findById(req.params.id);
        if(p)
        {
            const reviewed = await p.reviews.find(r => r.user.toString() === req.user.id.toString())
            if(reviewed)
            {
                 res.status(400).json({message:'Product Already Reviewed'})
            }
            else{
                const review = {
                    name : req.user.name,
                    rating:Number(rating),
                    comment,
                    user:req.user.id
                }
               
                p.reviews.push(review)
                p.numReviews = p.reviews.length
                p.rating = p.reviews.reduce((acc,item)=> item.rating+acc,0)/p.numReviews
                await p.save()
                res.status(201).json('Review Added')
            }
                
            
        }
    } catch (error) {
        res.status(400).json({message:'Not Found'})
    }
  
})
export default Productrouter