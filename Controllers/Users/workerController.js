const Worker = require("../../Models/wrokerModel");
const AppError = require("../../Utils/AppError");
const asyncErrorHandler = require("../../Utils/AsyncErrorHandler");

// Create Worker (Admin or Staff only)

exports.createWorker = asyncErrorHandler(async (req, res, next) => {
  const worker = await Worker.create(req.body);

  res.status(201).json({
    status: "success",
    data: worker,
  });
});

//   Get All Active Workers (Public)

exports.getAllWorkers = asyncErrorHandler(async (req, res, next) => {
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
exports.getWorkerById = asyncErrorHandler(async (req, res, next) => {
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
exports.updateWorker = asyncErrorHandler(async (req, res, next) => {
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
exports.deleteWorker = asyncErrorHandler(async (req, res, next) => {
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
