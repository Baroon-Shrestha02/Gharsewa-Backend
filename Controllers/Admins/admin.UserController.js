const User = require("../../Models/userModel");
const AppError = require("../../Utils/AppError");
const asyncErrorHandler = require("../../Utils/AsyncErrorHandler");

const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find().select("-password").sort("-createdAt");

  res.status(200).json({
    success: true,
    users,
  });
});

const updateActiveStatus = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new AppError("User ID is required", 400));

  const user = await User.findById(id);
  if (!user) return next(new AppError("User not found", 404));

  const newStatus = !user.activeStatus;
  user.activeStatus = newStatus;
  await user.save();

  res.send({
    success: true,
    isActive: newStatus,
  });
});

const deleteInactiveUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new AppError("User ID is required", 400));

  const user = await User.findById(id);
  if (!user) return next(new AppError("User not found", 404));

  if (user.activeStatus === true) {
    return next(new AppError("Cannot delete an active user", 400));
  }

  await User.findByIdAndDelete(id);

  res.send({
    success: true,
    message: "Inactive user deleted successfully",
  });
});

module.exports = { getAllUser, updateActiveStatus, deleteInactiveUser };
