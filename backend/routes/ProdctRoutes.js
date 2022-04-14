import express from "express";
import Product from "../models/productModel.js";
const Productrouter = express.Router()
//@desc - router for getting products from mongoose product model as all products or single product
Productrouter.get('/',async(req,res)=>{
    try {
        const p = await Product.find({});
       
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
export default Productrouter