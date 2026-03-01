const User = require("../../Models/userModel");

const asyncErrorHandler = require("../../Utils/AsyncErrorHandler");

const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find().select("-password").sort("-createdAt");

  res.status(200).json({
    success: true,
    users,
  });
});

const addJob = asyncErrorHandler(async (req, res, next) => {});

module.exports = { getAllUser };
