const jwt = require("jsonwebtoken");

const sendToken = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODEENV === "developement" ? "lax" : "none",
      secure: process.env.NODEENV === "developement" ? false : true,
    })

    .json({
      success: true,
      message,
    });
};

module.exports = sendToken;
