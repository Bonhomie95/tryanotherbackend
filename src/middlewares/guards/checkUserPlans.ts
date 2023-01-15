import {Request, Response, NextFunction} from "express"
const Payment = require ("../../database/entity/Payment")
const {deletePayment} = require("../../services/deletePayment")
import {BadRequestError} from "../../../lib/src/exceptions"

module.exports.checkBasicPlan = async (req:any, res:Response, next:NextFunction) => {
    const currentDate = new Date();
    try{
        if(req.user){
           const payment = await Payment.find({})
           const userPlan = payment.find((paymnt:any) => paymnt.user.id === req.user.id)
           if(!userPlan || userPlan.length === 0){
            throw new BadRequestError("no active plan")
        }
           if (new Date(payment.expiresIn).getTime() < currentDate.getTime()) {
            await deletePayment(payment._id)
            throw new BadRequestError("subscription plan is expired")
            }
           if(userPlan.subscriptionPlan !== "BASIC"){
            throw new BadRequestError("Your current plan does not support this functionality")
           }
           
           next()
        }
    }catch(error){
        next(error)
    }
}

module.exports.checkPremiumPlan = async (req:any, res:Response, next:NextFunction) => {
    const currentDate = new Date();
    try{
        if(req.user){
            const payment = await Payment.find({})
            const userPlan = payment.find((paymnt:any) => paymnt.user.id === req.user.id)
            if(!userPlan || userPlan.length === 0){
                throw new BadRequestError("no active plan")
            }
            if (new Date(payment.expiresIn).getTime() < currentDate.getTime()) {
                await deletePayment(payment._id)
                throw new BadRequestError("subscription plan is expired")
                }
               if(userPlan.subscriptionPlan !== "PREMIUM"){
                throw new BadRequestError("Your current plan does not support this functionality")
               }
           next()
        }
    }catch(error){
        next(error)
    }
}

module.exports.checkAdvancedPlan = async (req:any, res:Response, next:NextFunction) => {
    const currentDate = new Date();
    try{
        if(req.user){
            const payment = await Payment.find({})
            const userPlan = payment.find((paymnt:any) => paymnt.user.id === req.user.id)
            if(!userPlan || userPlan.length === 0){
                throw new BadRequestError("no active plan")
            }
            if (new Date(payment.expiresIn).getTime() < currentDate.getTime()) {
                await deletePayment(payment._id)
                throw new BadRequestError("subscription plan is expired")
                }
               if(userPlan.subscriptionPlan !== "ADVANCED"){
                throw new BadRequestError("Your current plan does not support this functionality")
               }
           next()
        }
    }catch(error){
        next(error)
    }
}

module.exports.checkCustomPlan = async (req:any, res:Response, next:NextFunction) => {
    const currentDate = new Date()
    try{
        if(req.user){
            const payment = await Payment.find({})
            const userPlan = payment.find((paymnt:any) => paymnt.user.id === req.user.id)
            if(!userPlan || userPlan.length === 0){
                throw new BadRequestError("no active plan")
            }
            if(new Date(payment.expiresIn).getTime() < currentDate.getTime()){
                await deletePayment(payment._id)
                throw new BadRequestError("subscription plan is expired")
            } 
            
            if(userPlan.subscriptionPlan === "CUSTOM"){
                next()
            }

            throw new BadRequestError("invalid Plan")
        }
    }catch(error){
        next(error)
    }
}

