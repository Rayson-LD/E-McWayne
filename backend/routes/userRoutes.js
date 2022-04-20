import express from "express";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js'
import { protect } from "../middleware/authMiddleware.js";
const userRouter = express.Router()
//@desc - router for login from mongoose user model and auth if user exists or not
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
        console.log(error)
    }

})

//@desc - router for creating user details in mongoose user db
userRouter.post('/',async(req,res)=>{
   
        
    const {name,email,password} = req.body
    const userExists = await User.findOne({email:email})
    if(userExists)
    {
        res.status(400).json({message:'User Already Exists'})
    }
    const user = await await User.create({
        name,
        email,
        password
    })
    if(user)
    {
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user.id)
        })
    }
    else{
        res.status(400).json({error:'Invalid User Data'})
    }


})

//@desc - router for getting user details from mongoose user model and display porfile page if user logged in
userRouter.get('/profile',protect,async(req,res)=>{
   
        
        const user = await User.findById(req.user.id)
        if(user)
        {
            res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            
            })

            
        }
        else{
            res.status(401).json({message:'User not found'})
        }
    

})

//@desc - router for posting user details from mongoose user model and update details in porfile page if user logged in
userRouter.put('/profile',protect,async(req,res)=>{
   
        
    const user = await User.findById(req.user.id)
    if(user)
    {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password)
        {
            user.password = req.body.password || user.password
        }
        const updateUser = await user.save()
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user.id)
            })
    }
    else{
        res.status(401).json({message:'User not found'})
    }


})

export default userRouter