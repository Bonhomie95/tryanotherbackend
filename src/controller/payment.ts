import axios from "axios"
const Payment = require("../database/entity/Payment")
const Post = require("../database/entity/newUserPost")
const subscriptionPlan = require("../config/Subscriptionplans")
import { Response, Request, NextFunction } from "express"
import { BadRequestError } from "../../lib/src/exceptions";
import { ResponseHandler } from "../../lib/src/helpers";
import config from "../config";
import UserService from "../services/UserService";
const { convertCurrencyToNaira } = require("../services/currencyConverter")
const { calculateExpiryDate } = require("../services/calculateExpiryDate")
const {createPaymentLog} = require("./ActivityLogs")

const token = config.PAYMENT_TOKEN



module.exports.getPaymentPrice = async (req: any, res: Response, next: NextFunction) => {
  try {
    const subscription = subscriptionPlan.map((subscription: any) => {
      let subData = {
        plan: subscription.plan,
        price: subscription.pricePerUserPerMonth

      }
      return subData
    })

    const currency = await convertCurrencyToNaira(10)
    const rate = currency.data.info.rate
    const availablePlans = subscription.map((sub: any) => {
      const newPlan = {
        plan: sub.plan,
        price: (sub.price * rate * 100).toFixed(2),
      }
      return newPlan
    })

    ResponseHandler.created(res, availablePlans, "success")
  } catch (error) {
    next(error)

  }
}

module.exports.getAllPayments = async(req:any, res:Response, next:NextFunction) => {
try{
  const payments = await Payment.find({})
  ResponseHandler.ok(res, payments, "success")
}catch(error){
  next(error)
}
}

module.exports.verifyTransaction = async (req: any, res: Response, next: NextFunction) => {
  const { reference, userId, plan } = req.params
  const expiryDate = calculateExpiryDate()
  // const userId = req.user.id
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`

      }
    }
    )

    if (response.data.status === false) {
      throw new BadRequestError(response.data.message)
    }

    if (response.data.data.status !== "success") {
      throw new BadRequestError(response.data.data.gateway_response)
    }
    const user = await UserService.checkThatUserExist(userId)

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      role: user.role,
      isVerified: user.isVerified,
      isActive: user.isActive,
    };

    const planPaymentData = {
      subscriptionPlan: plan,
      paymentId: response.data.data.id,
      amount: response.data.data.amount,
      expiresIn: expiryDate,
      user: userData
    }

    const payment = new Payment(planPaymentData)
    await payment.save()
    await createPaymentLog(user.id, plan)
    ResponseHandler.ok(res, payment, "success")
  } catch (err) {
    next(err);
  }

}




