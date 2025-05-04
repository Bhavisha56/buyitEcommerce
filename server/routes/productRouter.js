import express from "express";
import productControllers from "../controllers/productControllers.js"
// import verifytoken from "../middlewares/verificationMiddleware.js";
const router=express.Router();


router.route("/").post(productControllers.addProduct);
router.route("/all").get(productControllers.fetchProduct);
router.route("/product/:id").get(productControllers.fetchSingleproduct);



export default router;