import express from "express"
import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"

const router = express.Router()
import {protect} from "../middleware/authMiddleware.js"

import {registerPostValidtor,loginPostValidtor} from  "../middleware/authValidator.js"


// @route    GET api/auth
// @desc     Post -  get user by Token #loadUser
// @access   Private

router.get('/auth', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
        _id:user._id,
        name: user.name,
        email:user.email,
        token:generateToken(user._id)
    })
}));

//mongoose.Types.ObjectId.isValid('your id here');


// @route    GET api/user/register
// @desc     Post-  Register
// @access   Public

router.post("/register",registerPostValidtor,asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password)
    const userExist = await User.findOne({email});
    
    if(userExist){
        res.status(400)
        throw new Error("User Already Exist");
    }
    
    const user = await User.create({name,email,password})

    if(user){
        console.log(user)
        res.status(200).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(500)
        throw new Error('Invalid data');
    }
}))




// @route    GET api/user/login
// @desc     Post-  Login
// @access   Public

router.post("/login",loginPostValidtor,asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    console.log(email,password)

    if(user && (user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            email:user.email,
            token:generateToken(JSON.stringify(user._id))
        }) 
    }else{
        res.status(400)
        throw new Error('Invalid Credential');
    }
}))



export default router;