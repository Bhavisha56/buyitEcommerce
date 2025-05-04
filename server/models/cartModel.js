import mongoose from "mongoose";
// import User from "./userModel.js";

const cartSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required:true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
      },
      quantity:{
        type:Number,
        default:1
      },
    images: [
        {
          url: { type: String, required: true },
          alt: { type: String }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const Cart=new mongoose.model("Cart",cartSchema);

export default Cart;