import express from "express"
import mongoose from "mongoose"
import asyncHandler from "express-async-handler"
import moment from "moment"
import Sale from "../models/Sale.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()




// @desc    Create new order
// @route   POST /api/sales
// @access  Private
router.post("/",protect,asyncHandler(async(req,res)=>{
    const {saleItems,totalPrice} = req.body;

    if(saleItems && saleItems.length==0){
        res.status(400);
        throw new Error(`No order item`);
        return
    }else{ 

        const sale = new Sale({
            saleItems,
            user:req.user._id,
            totalPrice
        })

        const createdSale = await sale.save()
        res.status(200).json(createdSale);
    }
}))


// @desc    Get logged in user orders
// @route   GET /api/sales
// @access  Private
router.get("/",protect,asyncHandler(async(req,res)=>{
    const orders = await Sale.find({ user: req.user._id })
    res.json(orders)
}))


// @desc    Get All orders
// @route   GET /api/sales/all
// @access  Private
router.get("/all",asyncHandler(async(req,res)=>{
    const orders = await Sale.find({})
    res.json(orders)
}))


// @desc    Get All orders
// @route   GET /api/sales/all
// @access  Private
router.get("/saleItems",asyncHandler(async(req,res)=>{
    const orders = await Sale.aggregate([ { $unwind : "$saleItems" } ]) //.select("saleItems")
    console.log(orders)
    res.json(orders)
}))



// @desc    top 5 selling products.
// @route   GET /api/sales/top
// @access  Public
router.get("/top",asyncHandler(async(req,res)=>{
    console.log("TOP")
    const orders = await Sale.aggregate([
      { $unwind: '$saleItems' },
      { $group: { _id: "$saleItems.name", sumValue: { $sum: '$saleItems.quantity', } } },
      { $sort: { "sumValue": -1 }},
      { $limit: 5}
    ]);
    console.log(orders);
    res.json(orders)
}))


// @desc    today's new sales revenue amount.
// @route   GET /api/sales/revenue
// @access  Public
router.get("/revenue",asyncHandler(async(req,res)=>{
    let date = moment().toISOString(); //.startOf('day');
    const orders = await Sale.aggregate([
      {
        $match: { createdAt: { $gte: new Date('2022-08-15'), $lt: new Date('2022-08-18') } }
      },
      {
        $group: {
          _id: "$name",
          sumValue: { $sum: '$totalPrice', }
        }
      }
    ]);
    console.log("Orders" , orders);
    res.json(orders)
}))




export default router;

