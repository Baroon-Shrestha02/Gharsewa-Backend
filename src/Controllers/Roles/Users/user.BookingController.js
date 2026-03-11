import Booking from "../../../models/job/bookingModel.js";
import Job from "../../../models/job/jobModel.js";
import User from "../../../models/Usermodel.js";
import Worker from "../../../models/workerModel.js";
import AppError from "../../../utils/appError.js";
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";

export const getWorkers = asyncErrorHandler(async (req, res, next) => {
  const findWorkers = await User.find({
    role: "worker",
    kycStatus: "verified",
  });

  res.status(200).json({
    success: true,
    findWorkers,
  });
});

// export const getWorkers = asyncErrorHandler(async (req, res, next) => {
//   const workers = await Worker.find({ isActive: true }).populate(
//     "user",
//     "firstname lastname phone",
//   );

//   res.status(200).json({
//     success: true,
//     results: workers.length,
//     workers,
//   });
// });

export const requestWorkerForJob = asyncErrorHandler(async (req, res, next) => {
  const { jobId, workerId } = req.params;
  const userId = req.user.id;

  const job = await Job.findById(jobId);

  if (!job) {
    return next(new AppError("Job not found", 404));
  }

  // const worker = await User.findById(workerId);

  const worker = await User.findOne({
    _id: workerId,
    role: "worker",
    kycStaus: "verified",
  }).select("firstname lastname phone email role");

  if (!worker || worker.role !== "worker") {
    return next(new AppError("Worker not found", 404));
  }

  const existingBooking = await Booking.findOne({
    job: jobId,
    worker: workerId,
  });

  if (existingBooking) {
    return next(new AppError("Worker already requested", 400));
  }

  const booking = await Booking.create({
    job: jobId,
    user: userId,
    worker: workerId,
    workDate: job.workDate,
    workTime: job.workTime,
  });

  res.status(201).json({
    success: true,
    message: "Worker request sent",
    booking,
  });
});

export const getOneWorkers = asyncErrorHandler(async (req, res, next) => {
  const { workerId } = req.params;

  const worker = await User.findOne({
    _id: workerId,
    role: "worker",
  }).select("firstname lastname phone email role");

  if (!worker) {
    return next(new AppError("Worker not found", 404));
  }

  res.status(200).json({
    success: true,
    worker,
  });
});
