const express = require("express")
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError")
// const {isAuthenticated, isSeller} = require("../middleware/Auth")
const Order = require('../model/order')
const Product = require("../model/product");
const Shop = require('../model/Shop')
const sendMail = require('../utils/SendMail')
const {isSeller} = require("../middleware/Auth")

// create order
router.post("/order/create-order",catchAsyncErrors(async(req,res,next)=>{
    try{
        const {cart,shippingAddress,user,totalPrice,paymentInfo} = req.body;
        // group cart items by shopId
        const shopItemsMap = new Map();
        for(const item of cart){
            const shopId = item.shopId;
            if(!shopItemsMap.has(shopId))
            {
                shopItemsMap.set(shopId,[])
            }
            shopItemsMap.get(shopId).push(item);
        }
        // create order for each shop
        const orders = [];

        for(const [shopId,items] of shopItemsMap){
            const order = await Order.create({cart: items,shippingAddress,user,totalPrice,paymentInfo});
            orders.push(order);
        }
        res.status(201).json({
            success: true,
            orders,
        })

        try{
          await sendMail({
              email: user.email,
              subject: "Order Has been Placed",
              message: ` Hello ${user.name} Your Order has has been placed successfully.`
          })
          res.status(201).json({
              success: true,
              message: `please check your ${user.email} to verify your account`
          })}catch(err){
          return next(new ErrorHandler(err.message,400))
      }
  

    }catch(err){
        return next(new ErrorHandler(err,500))
    }
}))


// get All orders of user
router.get("/order/get-user-orders/:userId",catchAsyncErrors(async(req,res,next)=>{
    try{
        const orders = await Order.find({"user._id": req.params.userId}).sort({
            createdAt: -1,
        })

        res.status(201).json({
            success:true,
            orders,
        })
        

    }catch(err){
        return next(new ErrorHandler(err,500))
    }
}))

// get All orders of seller
router.get("/order/get-seller-orders/:shopId",catchAsyncErrors(async(req,res,next)=>{
    try{
        const orders = await Order.find({"cart.shopId": req.params.shopId}).sort({
            createdAt: -1,
        })

        res.status(201).json({
            success:true,
            orders,
        })
    }catch(err){
        return next(new ErrorHandler(err,500))
    }
}))

// update order status for seller
router.put("/order/update-order-status/:id",isSeller,catchAsyncErrors(async (req, res, next) => {
      try {
        
        const order = await Order.findOne({ _id: req.params.id });
        
        if (!order) {
          return next(new ErrorHandler("Order not found with this id", 400));
        }
        if (req.body.status === "Transferred to delivery partner") {
          order.cart.forEach(async (o) => {
            await updateOrder(o._id, o.qty);
          });
        }
  
        order.status = req.body.status;
  
        if (req.body.status === "Delivered") {
          order.deliveredAt = Date.now();
          order.paymentInfo.status = "Succeeded";
          //const serviceCharge = order.totalPrice * .10;
          await updateSellerInfo(order.totalPrice ,order.cart.shopId,order.user);
        }
  
        await order.save({ validateBeforeSave: false });
  
        res.status(200).json({
          success: true,
          order,
        });
  
          async function updateOrder(id, qty) {
          const product = await Product.findById(id);
  
          product.stock -= qty;
          product.sold_out += qty;
  
          await product.save({ validateBeforeSave: false });
        }
  
        async function updateSellerInfo(amount,user) {
          const seller = await Shop.findById(req.seller.id);

          seller.availableBalance = seller.availableBalance + amount;
          await seller.save({ validateBeforeSave: false });
          
          await sendMail({
            email: order.user.email,
            subject: "Order Has been Deliverd",
            message: ` Hello ${order.user.name} Your Order has has been deliverd successfully.`
        })
          
        }
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  // give a refund ----- user
  router.put(
    "/order/order-refund/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const order = await Order.findById(req.params.id);
  
        if (!order) {
          return next(new ErrorHandler("Order not found with this id", 400));
        }
  
        order.status = req.body.status;
  
        await order.save({ validateBeforeSave: false });
  
        res.status(200).json({
          success: true,
          order,
          message: "Order Refund Request successfully!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  // accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


  // all orders --- for admin
router.get(
  "/order/get-all-orders",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router