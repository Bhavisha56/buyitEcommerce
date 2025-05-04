import express from "express";
import authcontrollers from "../controllers/authcontrollers.js"
import verifytoken from "../middlewares/verificationMiddleware.js";
const router=express.Router();


router.route("/").get(verifytoken,authcontrollers.Home)  //add token verification in end
router.route("/register").post(authcontrollers.Register)
router.route("/login").post(authcontrollers.Login)
router.route("/logout").get(authcontrollers.Logout)
router.route("/forgetpassword").post(authcontrollers.ForgetPassword)

router.route("/me").get(verifytoken, (req, res) => {
    res.status(200).json({ msg: "Token is valid", user: req.user });
  });




export default router