const express = require("express")
const router = express.Router();
const Product = require("../model/product")
const upload = require("../upload")
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError")
const Shop = require("../model/Shop")
const {isSeller} = require("../middleware/Auth")
const Event = require("../model/event")
const fs = require("fs")


// Create Event
router.post("/product/create-events", upload.array("images"), catchAsyncErrors(async(req,res,next)=>{
    try{
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop)
        {
            return next(new ErrorHandler("Shop Id is invalid",400))
        }
        else{
            const files = req.files;
            // const imageUrls = files.map((file)=>{`${file.filename}`})
            const imageUrls = files.map((file) => `${file.filename}`);
            const eventData = req.body;
            eventData.images = imageUrls;
            eventData.shop = shop;
            
            const event = await Event.create(eventData);
            res.status(201).json({
                success:true,
                event,
            })

        }
    }catch(err){
        return next(new ErrorHandler(err,400))
    }
}) )

// get shop all events
router.get("/product/get-all-events/:id",catchAsyncErrors(async(req,res,next)=>{
    try{    
        const events = await Event.find({shopId: req.params.id});
        res.status(201).json({
            success: true,
            events,
        })

    }catch(err){
        return next(new ErrorHandler(err,400))
    }
}))

// delete shop event
router.delete("/product/delete-shop-event/:id",isSeller, catchAsyncErrors(async(req,res,next)=>{
    try{    
        const eventId = req.params.id;
        const eventData = await Event.findById(eventId)
        eventData.images.forEach((imageUrl)=>{
            const filename = imageUrl;
            const filePath = `uploads/${filename}`

            fs.unlink(filePath,(err)=>{
                if(err){
                    res.status(500).json({message: "Error deleting file"})
                }
            })
        })

        const event = await Event.findByIdAndDelete(eventId)


        if(!event)
        {
            return next("Event not found",500)
        }
        
        res.status(201).json({
            success:true,
            message: "Event deleted successfully"
        })
    }catch(err){
        return next(new ErrorHandler(err,400))
    }
}))

// get all events
router.get("/product/get-all-events", async (req, res, next) => {
    try {
      const events = await Event.find();
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  });

module.exports = router;