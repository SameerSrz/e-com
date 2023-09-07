const express = require("express")
const router = express.Router();
const Product = require("../model/product")
const upload = require("../upload")
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError")
const Shop = require("../model/Shop")
const path = require("path")
const categories = require("../model/category")
const {isSeller} = require("../middleware/Auth")
const {isAuthenticated} = require("../middleware/Auth")
const Order = require("../model/order")



// create Category
router.post("/create-category", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
    try {
      const { title } = req.body;
      const category = await categories.findOne({ title: req.body.title }); 
  
      if (category) {
        return next(new ErrorHandler("Category Already Exists", 500)); 
      } else {
        const filename = req.file.filename;
        const fileUrl = path.join("uploads", filename);
  
        const categoryData = {
          title: title,
          image: fileUrl,
        };
  
        const createdCategory = await categories.create(categoryData);
        res.status(201).json({
          success: true,
          category: createdCategory, 
        });
      }
    } catch (err) {
      return next(new ErrorHandler(err.message, 400)); 
    }
  }));
  

// all category --- for admin
router.get("/category/get-all-category",catchAsyncErrors(async (req, res, next) => {
  try {
    const Categories = await categories.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      Categories,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
);

// delete category
router.put('/category/delete-category/:id',catchAsyncErrors(async(req,res,next)=>{
  try{
    const Categories = await categories.findByIdAndDelete(req.params.id)
    res.status(201).json({
      success :true,
      msg:"Deleted Successfully",
      Categories
    })
  }catch(err){
    return next(new ErrorHandler(err,500))
  }
}))


module.exports = router