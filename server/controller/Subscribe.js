const express = require("express")
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError")
const Subscribe = require("../model/subscribe")

// create subscriber
router.post("/create-subscription", catchAsyncErrors(async(req,res,next)=>{
    try{
        const emailExits = await Subscribe.find({email: req.body.email});
        
        if(!emailExits){
            return next(new ErrorHandler("Email Already Exist",400));
        }

        const subscriber = await Subscribe.create(req.body);

        res.status(201).json({
            success: true,
            subscriber,
        })
    }catch(err){
        return next(new ErrorHandler(err,400))
    }
}))

// get all subscribers from admin
router.get("/subsribe/get-all-subscribers",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const subs = await Subscribe.find().sort({
          deliveredAt: -1,
          createdAt: -1,
        });
        
        res.status(201).json({
          success: true,
          subs,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

// delete subscriber
router.delete("/subscribe/delete-subscriber/:id", catchAsyncErrors(async(req,res,next)=>{
    try{    
        const subsId = req.params.id;
        const sub = await Subscribe.findByIdAndDelete(subsId)

        if(!sub)
        {
            return next("Subscriber not found",500)
        }
        
        res.status(201).json({
            success:true,
            message: "Subscriber deleted successfully"
        })
    }catch(err){
        return next(new ErrorHandler(err,400))
    }
}))

module.exports = router