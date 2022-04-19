import express from "express";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js'
const userRouter = express.Router()
//@desc - router for getting products from mongoose product model as all products or single product
userRouter.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(user && (await user.matchPassword(password)))
        {
            res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user.id)
            })

            
        }
        else{
            res.status(401).json({message:'Invalid Credentials'})
        }
    } catch (error) {
        res.status(400).json({message:'Something Went Wrong. Please Try Again Later'})
       
    }

})


export default userRouter