const express = require("express")
const router = express.Router();
const {upload} = require("../multer")
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError")
const Shop = require("../model/Shop")
const {isSeller} = require("../middleware/Auth")
const couponCode = require("../model/couponCode");

// create coupon
router.post("/coupon/create-coupon-code",isSeller, catchAsyncErrors(async(req,res,next)=>{
    try{
        const couponCodeExists = await couponCode.find({name: req.body.name});
        if(couponCodeExists.length !== 0){
            return next(new ErrorHandler("Coupon Code Already Exist",400));
        }

        const CouponCode = await couponCode.create(req.body);

        res.status(201).json({
            success: true,
            CouponCode,
        })
    }catch(err){
        return next(new ErrorHandler(err,400))
    }
}))

// get All Coupons
router.get("/coupons/get-coupons/:id",isSeller, catchAsyncErrors(async(req,res,next)=>{
    try{
        const coupons = await couponCode.find({shopId: {_id: req.params.id}});
        res.status(201).json({
            success: true,
            coupons,
        })
    }catch(err){
        return next(new ErrorHandler(err,400))
    }
}))

// get Coupon
router.get("/coupons/get-coupon-value/:name",catchAsyncErrors(async(req,res,next)=>{
    try{
        const coupon = await couponCode.find({name: req.params.name});
        res.status(201).json({
            success: true,
            coupon,
        })
    }catch(err){
        return next(new ErrorHandler(err,500))
    }
}))

// delete coupon
router.delete("/coupon/delete-coupon/:id", catchAsyncErrors(async(req,res,next)=>{
    try{    
        const couponId = req.params.id;
        const coupons = await couponCode.findByIdAndDelete(couponId)

        if(!coupons)
        {
            return next("Subscriber not found",500)
        }
        
        res.status(201).json({
            success:true,
            message: "Coupon deleted successfully"
        })
    }catch(err){
        return next(new ErrorHandler(err,400))
    }
}))

// all coupons --- for admin
router.get(
    "/coupons/get-all-coupons",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const coupons = await couponCode.find().sort({
          deliveredAt: -1,
          createdAt: -1,
        });
        
        res.status(201).json({
          success: true,
          coupons,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

module.exports = router