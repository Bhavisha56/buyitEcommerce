import express from "express";
import cartControllers from "../controllers/cartControllers.js"
import verifytoken from "../middlewares/verificationMiddleware.js";
const router=express.Router();



router.route("/").post(verifytoken,cartControllers.cartData);
router.route("/item/:id").get(verifytoken,cartControllers.cartFetch);
router.route("/update/:id").put(verifytoken,cartControllers.updateCartQuantity);
router.route("/delete/:id").delete(verifytoken,cartControllers.deleteitem);

export default router;