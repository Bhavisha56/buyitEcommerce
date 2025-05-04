import mongoose from "mongoose"

const mainCardSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category: {
        type: String,
        required: true,
    },
    ratings: {
         type: Number,
          default: 5 ,
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

const Maincardmodel=new mongoose.model("Maincard",mainCardSchema);

export default Maincardmodel