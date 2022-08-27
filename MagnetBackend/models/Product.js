import mongoose from "mongoose";
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

const Product = mongoose.model('Product', ProductSchema);

export default Product;