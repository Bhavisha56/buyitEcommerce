import express from "express";
// maincardControllers
import verifytoken from "../middlewares/verificationMiddleware.js";
import maincardControllers from "../controllers/maincardControllers.js";
const router=express.Router();


router.route("/").post(verifytoken,maincardControllers.mainCardProduct);
router.route("/all").get(verifytoken,maincardControllers.mainCardProductFetch);
router.route("/maincard/:id").get(verifytoken,maincardControllers.mainCardProductFetchSingle);



export default router