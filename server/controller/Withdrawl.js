const Shop = require("../model/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/Auth");
const withdrawl = require("../model/withdrawl");
const sendMail = require("../utils/SendMail");
const router = express.Router();

// create withdraw request --- only for seller
router.post(
    "/withdraw/create-withdraw-request",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { amount } = req.body;
  
        const data = {
          seller: req.seller,
          amount,
        };
  
        try {
          await sendMail({
            email: req.seller.email,
            subject: "Withdraw Request",
            message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `,
          });
          res.status(201).json({
            success: true,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
  
        const withdraw = await withdrawl.create(data);
  
        const shop = await Shop.findById(req.seller._id);
  
        shop.availableBalance = shop.availableBalance - amount;
  
        await shop.save();
  
        res.status(201).json({
          success: true,
          withdraw,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );


  // get all withdrawls
  router.get('/withdrawl/get-all-withdraw-request', catchAsyncErrors(async(req,res,next)=>{
    try{
      const withdrawls = await withdrawl.find();
      res.status(201).json({
        success: true,
        withdrawls
      })

    }catch(err){
      return next(new ErrorHandler(err),500)
    }
  }))
  
//   // update withdraw request ---- admin
  router.put(
    "/update-withdraw-request/:id",catchAsyncErrors(async (req, res, next) => {
      try {
        const { sellerId } = req.body;
          
        try {
          const withdraw = await withdrawl.findByIdAndUpdate(
            req.params.id,
            {
              status: "succeed",
              updatedAt: Date.now(),
            },
            { new: true }
          );

          const seller = await Shop.findById(sellerId);

          const transaction = {
            _id: withdraw._id,
            amount: withdraw.amount,
            updatedAt: withdraw.updatedAt,
            status: withdraw.status,
          };

          seller.transections.push(transaction);
          await seller.save();

          await sendMail({
            email: seller.email,
            subject: "Payment confirmation",
            message: `Hello ${seller.name}, Your withdrawal request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules, usually taking 3 to 7 days.`,
          });

          res.status(201).json({
            success: true,
            withdraw,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }

      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

module.exports = router