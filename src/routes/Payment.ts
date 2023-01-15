import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";

const {verifyTransaction, getPaymentPrice, getAllPayments} = require("../controller/payment");

const router = express.Router();





router.get("/", Authenticate, getAllPayments)
router.get("/prices", Authenticate, getPaymentPrice)
router.post("/verify/:reference/:userId/:plan", verifyTransaction)
 

export default router;
