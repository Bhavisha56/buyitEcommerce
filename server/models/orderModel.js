import mongoose from "mongoose"

const orderSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    ratings: {
         type: Number,
          default: 5 ,
      },
    user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User", 
                  required:true,
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

const Ordered=new mongoose.model("Ordered",orderSchema);

export default Ordered