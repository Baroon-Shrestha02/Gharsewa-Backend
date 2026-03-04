// import Worker from "../../Models/wrokerModel.js";
// import AppError from "../../Utils/appError.js";
// import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";
// Create Worker (Admin or Staff only)
import Worker from "../../Models/wrokerModel.js";
import AppError from "../../Utils/appError.js";
import asyncErrorHandler from "../../Utils/asyncErrorHandler.js";

export const createWorker = asyncErrorHandler(async (req, res, next) => {
  const worker = await Worker.create(req.body);

  res.status(201).json({
    status: "success",
    data: worker,
  });
});

//   Get All Active Workers (Public)

export const getAllWorkers = asyncErrorHandler(async (req, res, next) => {
  const workers = await Worker.find({
    isActive: true,
    KYC_status: "verified", // only verified workers visible
  });

  res.status(200).json({
    status: "success",
    results: workers.length,
    data: workers,
  });
});

// Get singke worker
export const getWorkerById = asyncErrorHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.params.id);

  if (!worker || !worker.isActive) {
    return next(new AppError("Worker not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: worker,
  });
});

// Update Worker (admin , staff and own worker )
export const updateWorker = asyncErrorHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.params.id);

  if (!worker) {
    return next(new AppError("Worker not found", 404));
  }

  // If role is worker, allow update only own profile
  if (
    req.user.role === "worker" &&
    worker.user?.toString() !== req.user._id.toString()
  ) {
    return next(new AppError("You can only update your own profile", 403));
  }

  const updatedWorker = await Worker.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    data: updatedWorker,
  });
});

// Delete worker (Admin Only )
export const deleteWorker = asyncErrorHandler(async (req, res, next) => {
  const worker = await Worker.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true },
  );

  if (!worker) {
    return next(new AppError("Worker not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Worker deleted successfully",
  });
});
