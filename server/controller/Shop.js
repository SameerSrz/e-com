const express = require("express")
const path = require("path")
const router = express.Router();
const Shop = require("../model/Shop")
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

router.post('/seller/create-shop',upload.single("file"),async(req,res,next)=>{
    const{name,shopName,phoneNumber,address,zipCode,avatar,email,password,confirmPassword} = req.body;
    console.log(req.body)
    const userEmail = await Shop.findOne({email});
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
    
    const filename = req.file;
    
    const seller = {
        name: name,
        shopName: shopName,
        phoneNumber: phoneNumber,
        address: address,
        zipCode: zipCode,
        email: email,
        password: password,
        confirmPassword:confirmPassword,
        avatar: avatar,
      };
      console.log(seller);
    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`

    try{
        await sendMail({
            email: seller.email,
            subject: "Activate your Account",
            message: ` Hello ${seller.name} please click below to activate your account: ${activationUrl}`
        })
        res.status(201).json({
            success: true,
            message: `please check your ${seller.email} to verify your account`
        })
    }catch(err){
        return next(new ErrorHandler(err.message,400))
    }


})

//create activation token
const createActivationToken = (seller)=>{
    return jwt.sign(seller,process.env.ACTIVATION_KEY,{
        expiresIn: "1d",
    })    
}

//activate user
router.post(
    "/seller/activation",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
        // console.log(req.body)
        const newUser = jwt.verify(
          activation_token,
          process.env.ACTIVATION_KEY
        );
  
        if (!newUser) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, shopName , phoneNumber , avatar, address , zipCode, email, password, confirmPassword } = newUser;
        console.log(newUser)
        let seller = await Shop.findOne({ email });
  
        if (seller) {
          return next(new ErrorHandler("User already exists", 400));
        }
        else{
            const newSeller = await Shop.create({
              name: name,
              shopName: shopName,
              phoneNumber: phoneNumber,
              address: address,
              zipCode: zipCode,
              email: email,
              password: password,
              confirmPassword:confirmPassword,
              avatar: avatar,
        });
        // console.log(newSeller)
        sendShopToken(newSeller, 201, res);}
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

//    login seller
  router.post(
    "/seller/login-seller",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const seller = await Shop.findOne({ email }).select("+password");
  
        if (!seller) {
          return next(new ErrorHandler("Seller doesn't exists!", 400));
        }
  
        const isPasswordValid = await seller.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
  
        sendShopToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  //load seller
  router.get(
    "/seller/getSeller",isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const seller = await Shop.findById(req.seller._id);
  
        if (!seller) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.get('/uploads/:avatar', (req, res) => {
    const filename = req.params.avatar;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    res.sendFile(filePath);
  });

  // logout Seller
  router.get("/seller/logout",catchAsyncErrors(async(req,res,next)=>{
    try{
        res.cookie("seller_token",null,{
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        res.status(201).json({
          success: true,
          message: "Logout Successfull!"
        })
    }catch(error){
      return next(new ErrorHandler(error.message,500))
    }
  }))

  router.get("/:filename",catchAsyncErrors(async(req,res,next)=>{
    const filename = req.params.filename;
    const file = await Shop.findOne({avatar:filename});
    if(!file){
      return next(new ErrorHandler("No file found",404))
      }
      res.status(200).json({
        success: true,
        file,
      })
  }))


  // get Shop info

  router.get("/get-shop-info/:id",catchAsyncErrors(async(req,res,next)=>{
    try{
      const shop = await Shop.findById({_id: req.params.id})
      res.status(201).json({
        success:true,
        shop,
      })
      
    }catch(err){
      return next(new ErrorHandler(err,500))
    }
  }))

  // all sellers --- for admin
router.get("/seller/admin-all-sellers",
catchAsyncErrors(async (req, res, next) => {
  try {
    const sellers = await Shop.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      sellers,
    });
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
);


// update seller withdraw methods --- sellers
router.put("/shop/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;
      

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });
      

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
)

router.put('/shop/remove-payment-method/:id',catchAsyncErrors(async(req,res,next)=>{
  try{
    
    const seller = await Shop.findById(req.params.id);
    if(!seller){
      return next(new ErrorHandler("Shop not found"))
    }
    seller.withdrawMethod = null;

    await seller.save();
    res.status(201).json({
      success:true,
      message: "Payment Method Deleted Successfully",
      seller,
    })
  }catch(err){
    return next(new ErrorHandler(err,500))
  }
}))

module.exports = router;