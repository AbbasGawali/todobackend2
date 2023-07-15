const User = require("../models/userScheema");
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies; 
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Please Login",
    });
  }
  const decoded = jwt.verify(token, process.env.JWTSECRET);

  req.user = await User.findById(decoded._id);

  next();
};
module.exports = isAuthenticated;
