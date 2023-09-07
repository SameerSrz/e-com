const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncError = require("../middleware/CatchAsyncError");
const router = express.Router()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payments/process", CatchAsyncError(async(req,res,next)=>{
    try{
        const myPayments = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            metadata: {
                company: "PureLogics",
            }
        })
        res.status(201).json({
            success: true,
            client_secret: myPayments.client_secret
        })
    }catch(err){
        return next(new ErrorHandler(err,500))
    }
}))

router.get("/payments/stripeapikey", CatchAsyncError(async(req,res,next)=>{
    res.status(201).json({
        stripeApiKey: process.env.STRIPE_API_KEY,
    })
}))

module.exports = router