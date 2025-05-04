import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGOURI=process.env.MONGO_URI;

const connectDB=async()=>{
    try {
        await mongoose.connect(MONGOURI);
        console.log("Db Connected Successfully");
        
    } catch(error) {
        console.error("Database connection failed");
        process.exit(0);
    }
}

export default connectDB;