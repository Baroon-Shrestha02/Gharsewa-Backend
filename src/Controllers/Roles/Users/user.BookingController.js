import Booking from "../../../models/job/bookingModel.js";
import Job from "../../../models/job/jobModel.js";
import User from "../../../models/Usermodel.js";
import AppError from "../../../utils/appError.js";
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";

export const jobBooking = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!id) return next(new AppError("Job not found.", 404));

  const jobToBook = await Job.findById(id);
  if (!jobToBook) return next(new AppError("Job does not exist", 404));

  const user = await User.findById(userId);
  if (!user) return next(new AppError("User not found", 404));

  if (user.role !== "user") {
    return next(new AppError("Only users can request jobs", 403));
  }

  const existingBooking = await Booking.findOne({
    job: id,
    user: userId,
  });

  if (existingBooking) {
    return next(new AppError("You already requested this job", 400));
  }

  const booking = await Booking.create({
    job: id,
    user: userId,
  });

  res.status(201).json({
    success: true,
    message: "Booking request sent successfully",
    booking,
  });
});

export const getBookings = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;

  const findBookings = await Booking.find({ user: userId })
    .populate("job")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: findBookings.length,
    bookings: findBookings,
  });
});
