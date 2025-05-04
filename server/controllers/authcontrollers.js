import dotenv from "dotenv";
dotenv.config();
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const Home=(req,res)=>{
    res.send("home")
}

const Register=async(req,res)=>{
   try {
     const {name,email,password}=req.body;
     const userExist=await User.findOne({email});
     if(userExist){
    return res.status(400).json({msg:"email already exist"})
     }
     const hash = bcrypt.hashSync(password, 10);
     await User.create({
      name,
      email,
      password:hash
     })
     return res.status(200).json({msg:"user created"});
   } catch(error) {
    console.error("register error",error);
   }
}

const Login=async(req,res)=>{
  try {
    const {email,password}=req.body;
    const userExist=await User.findOne({email});
    if(!userExist){
      return res.status(400).json({msg:"not registerd"})
    }
    const checkPassword=await bcrypt.compare(password,userExist.password);
    if(checkPassword){
      const token = jwt.sign(
        { id: userExist._id ,email:userExist.email},        
        process.env.SECRETKEY,         
        {
          expiresIn: '1d'
        }
      );
      
      
      res.cookie("token",token,{
        httpOnly: true,
        secure: false, // true if using HTTPS
        sameSite: "Lax", // or "None" if cross-origin
        maxAge: 86400000,
      })
      res.status(200).json({msg:"login success"});
    }else{
      return res.status(500).json({msg:"Invalid credentials"});

    }
  } catch (error) {
    console.error("login error",error)
  }
}

const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax", // or 'None' if using HTTPS in production
      secure: false,   // set true in production with HTTPS
    });
    res.status(200).json({ msg: "Logout success" });
  } catch (error) {
    console.error("logout error", error);
    res.status(500).json({ msg: "Logout failed" });
  }
};

const ForgetPassword=async(req,res)=>{
  try {
    const {email,password}=req.body
    const userExist=await User.findOne({email})
    if(!userExist){
      return res.status(400).json({msg:"invalid details"})
    }
    const hash = bcrypt.hashSync(password, 10);
     userExist.password=hash
    await userExist.save()
    res.status(200).json({ msg: "Password updated successfully" });

  } catch(error) {
    console.error(error);
  }
}




export default {Home,Register,Login,Logout,ForgetPassword}