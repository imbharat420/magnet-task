import mongoose from "mongoose";
const Schema = mongoose.Schema

const saleSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }, 
    saleItems: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          amount: { type: Number, required: true },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
          },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    }
},
{
    timestamps: true,
})

const Product = mongoose.model('Sale', saleSchema);

export default Product;