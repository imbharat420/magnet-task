import express from "express"
import mongoose from "mongoose"
import asyncHandler from "express-async-handler"


import Product from "../models/Product.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()


// @route    GET api/products
// @desc     get all products  
// @access   Public

router.get("/",asyncHandler(async(req,res)=>{
    const product = await Product.find({})
    res.send(product);
}))



// @route    POST api/products
// @desc     Create product  
// @access   Public

router.post("/",protect,asyncHandler(async(req,res)=>{
    const {name,quantity,amount} = req.body;
    const product = new Product({name,quantity,amount})
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
}))




// @route    POST api/products
// @desc     get product by ID  
// @access   Public


router.get("/:id",asyncHandler(async(req,res)=>{
    let id = req.params.id;
    const product = await Product.findById(id)
    res.send(product);
}))



export default router;