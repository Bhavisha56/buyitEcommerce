import dotenv from "dotenv";
dotenv.config();
import express from "express"
import connectDB from "./utils/db.js";
import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import mainRouter from "./routes/maincardRouter.js"
import contactRouter from "./routes/contactRouter.js"
import orderRouter from "./routes/orderRouter.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT=process.env.PORT || 8001
const app=express();
// const __dirname=path.resolve()
app.use(express.json())

app.use(cookieParser())


const corsOptions = {
   origin: "http://localhost:5173", 
   methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
   credentials: true,
 };
 

 app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 app.use(cors(corsOptions));
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/contact', contactRouter);
app.use('/api/main', mainRouter);
app.use('/api/order', orderRouter);

if(process.env.NODE_ENV==="production"){
   app.use(express.static(path.join(__dirname, "../client/dist")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

}



connectDB().then(()=>{
   app.listen(PORT,()=>{
      console.log(`server start at PORT:http://localhost:${PORT}`);
   })
})