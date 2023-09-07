const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sellerRequestSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter your name!"],
  },
  shopName:{
    type: String,
    required: [true, "Please enter your name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter your email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [7, "Password should be greater than 7 characters"],
    
  },
  confirmPassword:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [7, "Password should be greater than 7 characters"],
    
  },
  phoneNumber:{
    type: String,
  },
  address:{
    type: String,
    required: [true, "Please enter your address"],
  },
//   addresses:[
//     {
//       country: {
//         type: String,
//       },
//       city:{
//         type: String,
//       },
//       address1:{
//         type: String,
//       },
//       address2:{
//         type: String,
//       },
//       zipCode:{
//         type: Number,
//       },
//       addressType:{
//         type: String,
//       },
//     }
//   ],
  zipCode:{
    type: Number,
    required: [true, "Please enter your zip code"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  availableBalance:{
    type: Number,
  },
  role:{
    type: String,
    default: "seller",
  },
  avatar:{
    type: String,
    required: [true, "Please enter your profile picture"],
 },
 createdAt:{
  type: Date,
  default: Date.now(),
 },
 resetPasswordToken: String,
 resetPasswordTime: Date,
});


//  Hash password
sellerRequestSchema.pre("save", async function (next){
  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword,12);
});

// // jwt token
sellerRequestSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// // compare password
sellerRequestSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("SellerRequest", sellerRequestSchema);