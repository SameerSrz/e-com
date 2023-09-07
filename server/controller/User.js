const express = require("express")
const path = require("path")
const router = express.Router();
const User = require("../model/user")
// const {upload} = require("../multer");
const upload = require("../upload")
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const sendMail = require("../utils/SendMail")
const catchAsyncErrors = require("../middleware/CatchAsyncError")
const sendToken = require("../utils/jwtToken")
const {isAuthenticated} = require("../middleware/Auth")

router.post("/user/create-user",upload.single("file"),async(req,res,next)=>{
    const{name,email,password,confirmPassword} = req.body;
    const userEmail = await User.findOne({email})
    if(userEmail)
    {
        const filename= req.file.filename;
        const filepath = `uploads/${filename}`;
        fs.unlink(filepath,(err)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({message: "Error deleting file"})
            }else{
                res.json({message: "file deleted successfully"})
            }
        })
        return next(new ErrorHandler("User Already exits",400));
    }
    if(password !== confirmPassword)
    {
        return next(new ErrorHandler("Password Doesn't Match",400));
    }
    const filename= req.file.filename
    const fileUrl = path.join(filename);
    const avatar = fileUrl;

    const user = {
        name: name,
        email: email,
        password: password,
        confirmPassword:confirmPassword,
        avatar: filename,
      };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`

    try{
        await sendMail({
            email: user.email,
            subject: "Activate your Account",
            message: ` Hello ${user.name} please click below to activate your account: ${activationUrl}`
        })
        res.status(201).json({
            success: true,
            message: `please check your ${user.email} to verify your account`
        })
    }catch(err){
        return next(new ErrorHandler(err.message,400))
    }


    // const savedUser = await user.save();
    // if(savedUser)
    // {
    //     res.status(201).json({
    //         success:true,
    //         message:"User Created Successfully",
    //         savedUser
    //     })
    // }


})

//create activation token
const createActivationToken = (user)=>{
    return jwt.sign(user,process.env.ACTIVATION_KEY,{
        expiresIn: "5m",
    })    
}

//activate user
router.post(
    "/activation",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
  
        const newUser = jwt.verify(
          activation_token,
          process.env.ACTIVATION_KEY
        );
  
        if (!newUser) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, confirmPassword , avatar} = newUser;
  
        let user = await User.findOne({ email });
  
        if (user) {
          return next(new ErrorHandler("User already exists", 400));
        }
        else{
            user = await User.create({
          name,
          email,
          password,
          confirmPassword,
          avatar
        });
  
        sendToken(user, 201, res);}
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  
  // login user
  router.post(
    "/user/login-user",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await User.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
  
        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  //load user
  router.get(
    "/user/getuser",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id);
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  // logout User
  router.get("/user/logout",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try{
        res.cookie("token",null,{
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

  // update user info
router.put(
  "/user/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      // const isPasswordValid = await user.comparePassword(password);

      // if (!isPasswordValid) {
      //   return next(
      //     new ErrorHandler("Please provide the correct information", 400)
      //   );
      // }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);

      const existAvatarPath = `uploads/${existsUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addresses
router.put(
  "/user/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      
      const user = await User.findById(req.user.id);
      user.addresses[0] = req.body;

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/user/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user infoormation with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all users --- for admin
router.get("/admin-all-users",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // delete users --- admin
// router.delete(
//   "/delete-user/:id",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.params.id);

//       if (!user) {
//         return next(
//           new ErrorHandler("User is not available with this id", 400)
//         );
//       }

//       await User.findByIdAndDelete(req.params.id);

//       res.status(201).json({
//         success: true,
//         message: "User deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = router;