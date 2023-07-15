const express = require("express");
const User = require("../models/userScheema");
const getAllUsers = require("../controllers/userControllers");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendCookie = require("../utils/features");
const isAuthenticated = require("../middlewares/auth");
const { ErrorHandler } = require("../middlewares/errorm");

router.get("/all", getAllUsers);
// using function from controllers

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Credentials", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Credentials", 400));
    }

    sendCookie(user, res, `Welcome ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    // await User.create({
    //   name,
    //   email,
    //   password,
    // });

    if (user) {
      return next(new ErrorHandler("User Already Exists", 400));
    }
    const hashpassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashpassword });

    sendCookie(user, res, "Registered Successfully", 200);
  } catch (error) {
    next(error);
  }
});

router.get("/getMyProfile", isAuthenticated, async (req, res, next) => {
  // const id = req.query.id;
  // console.log(req.params);

  // console.log(req.params);
  // const id = req.params.id;
  // const { token } = req.cookies;
  // console.log(token);
  // if (!token) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Please Login",
  //   });
  // }
  // const decoded = jwt.verify(token, process.env.JWTSECRET);

  // let user = await User.findById(decoded._id);
  // console.log(user);
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()) })
      .json({
        success: true,
        message: "Logout Successfull",
        sameSite: process.env.NODEENV === "developement" ? "lax" : "none",
        secure: process.env.NODEENV === "developement" ? false : true,
      });
  } catch (error) {
    next(error);
  }
});
// router.put("/userDetails/:id", async (req, res) => {
//   // const id = req.query.id;
//   // console.log(req.params);
//   //   console.log(req.params);
//   const id = req.params.id;
//   const user = await User.findById(id);

//   res.json({
//     success: true,
//     message: "updated",
//   });
// });

// router.delete("/userDetails/:id", async (req, res) => {
//   // const id = req.query.id;
//   // console.log(req.params);
//   //   console.log(req.params);
//   const id = req.params.id;
//   const user = await User.findById(id);
//   //   await user.remove();
//   res.json({
//     success: true,
//     message: "User Deleted",
//   });
// });

module.exports = router;
