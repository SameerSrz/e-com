const express = require("express")
const path = require("path")
const router = express.Router();
const Shop = require("../model/Shop")
const SellerRequest = require("../model/sellerReq")
const upload = require("../upload");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const sendMail = require("../utils/SendMail")
const catchAsyncErrors = require("../middleware/CatchAsyncError")
const sendShopToken = require("../utils/shopJwtToken")
const {isSeller} = require("../middleware/Auth");
const CatchAsyncError = require("../middleware/CatchAsyncError");


// create seller request
router.post('/seller/create-shop-request',upload.single("file"),async(req,res,next)=>{
    console.log(req.body)
    const{name,shopName,phoneNumber,category,address,zipCode,email,password,confirmPassword} = req.body;
    const userEmail = await Shop.findOne({email});
    const isUserEmail = await SellerRequest.findOne({email});

    if(userEmail)
    {
        const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
        return next(new ErrorHandler("User Already exits",400));
    }
    if(isUserEmail)
    {
        const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
        return next(new ErrorHandler("User Already exits",400));
    }
    if(password !== confirmPassword)
    {
        return next(new ErrorHandler("Password Doesn't Match",400));
    }
    // const filename= req.file.filename;
    // const baseDir = '../uploads';
    // const fileUrl = path.posix.join(baseDir, filename);
    // const avatar = fileUrl;
    const filename = req.file.filename;
    const fileUrl = path.join("uploads", filename);

    const seller = await SellerRequest.create({
        name: name,
        shopName: shopName,
        phoneNumber: phoneNumber,
        address: address,
        zipCode: zipCode,
        category:category,
        email: email,
        password: password,
        confirmPassword:confirmPassword,
        avatar: fileUrl,
      })


      res.status(201).json({
                success: true,
                message: `Keep checking your mail to activate your account`
            })


})
// get all seller req --- admin

router.get("/seller/admin-all-sellers-requests",
catchAsyncErrors(async (req, res, next) => {
  try {
    const sellers = await SellerRequest.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      sellers,
    });
    // console.log(sellers)
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
);

// get seller info

router.get("/seller/get-seller-info/:id",catchAsyncErrors(async(req,res,next)=>{
    try{
      // console.log(req.params.id)
      const seller = await SellerRequest.findById({_id: req.params.id})
      res.status(201).json({
        success:true,
        seller,
      })
      // console.log(seller)
    }catch(err){
      return next(new ErrorHandler(err,500))
    }
  }))

  // delete seller req
router.delete("/coupon/delete-coupon/:id", catchAsyncErrors(async(req,res,next)=>{
  try{    
      const seller = req.params.id;
      const sellerReq = await SellerRequest.findByIdAndDelete(seller)

      if(!sellerReq)
      {
          return next("Subscriber not found",500)
      }
      
      res.status(201).json({
          success:true,
          sellerReq
      })
  }catch(err){
      return next(new ErrorHandler(err,400))
  }
}))

module.exports = router;