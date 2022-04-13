import express from 'express';
import product from'./data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
const app = express();
dotenv.config();
connectDB();
//All products
app.get('/api/product',(req,res)=>{
    res.json(product)
})

//single product
app.get('/api/product/:id',(req,res)=>{
    const p = product.find((product)=>(product._id === req.params.id));
    res.json(p)
})
const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server Running on ${port} in ${process.env.mode} mode`));