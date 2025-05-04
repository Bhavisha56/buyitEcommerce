import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; 

const verifytoken = async (req, res, next) => {

  const token = req.cookies.token || req.headers.authorization;
  if (!token) {
    return res.status(400).json({ msg: "Authorization denied: No token" });
  }

  const jwttoken=token.replace("Bearer","").trim()
  try {
    const isVerified = jwt.verify(jwttoken, process.env.SECRETKEY);
    const userData = await User.findOne({ email: isVerified.email }).select("-password");

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    // req.productID=productData._id
    next();
  } catch (error) {
    console.error("verifytoken error:", error);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default verifytoken;
