import express from "express";
import contactontrollers from "../controllers/contactControllers.js"
import verifytoken from "../middlewares/verificationMiddleware.js";
const router=express.Router();

router.route("/contactin").post(verifytoken,contactontrollers.contactDataAdd)

export default router;