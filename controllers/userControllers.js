const User = require("../models/userScheema");

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(201).json({
    success: true,
    users,
  });
};
module.exports = getAllUsers;
