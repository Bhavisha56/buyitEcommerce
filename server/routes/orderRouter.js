import express from "express";
import orderControllers from "../controllers/orderControllers.js";
import verifytoken from "../middlewares/verificationMiddleware.js";

const router=express.Router();


router.route("/").get(verifytoken,orderControllers.fetchitem);
router.route("/delete/:id").delete(verifytoken,orderControllers.deleteitem);
router.route("/buy").post(verifytoken,orderControllers.PlaceItem);


export default router;