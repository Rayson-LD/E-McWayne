//used to insert or delete data into the database
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import products from "./data/products.js";
import user from "./data/users.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
const insertData = async()=>{
    try {
        await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const newUsers = await User.insertMany(users)
    //since product has ref to admin user, we need the id
    const adminId = newUsers[0]._id
   const sampleProduct = products.map(p=>{
        return {...products,user:adminId}
    })
    await Product.insertMany(sampleProduct);
    console.log("Data Imported");
    } catch (error) {
        console.error(`${error.message}`)
    }

}

const deleteData = async()=>{
    try {
        await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

   
    console.log("Data Deleted");
    } catch (error) {
        console.error(`${error.message}`)
    }

}