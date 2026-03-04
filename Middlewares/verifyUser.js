const jwt = require("jsonwebtoken");
const AppError = require("../Utils/appError");
const asyncErrorHandler = require("../Utils/AsyncErrorHandler");
const User = require("../Models/Usermodel");

const protect = asyncErrorHandler(async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError("Not authorized.", 401));
  }

  if (!token) {
    return next(new AppError("Not authorized. No token provided.", 401));
  }

  // 🔹 Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 🔹 Get user from database
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  // 🔹 Attach user to request
  req.user = user;

  next();
});

module.exports = protect;
