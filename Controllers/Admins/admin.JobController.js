const Job = require("../../Models/Job/jobModel");
const Category = require("../../Models/Job/categoryModel");
const asyncErrorHandler = require("../../Utils/AsyncErrorHandler");
const AppError = require("../../Utils/AppError");
const { uploadImages } = require("../../Utils/imageUploader");
const cloudinary = require("cloudinary").v2;

const createJob = asyncErrorHandler(async (req, res, next) => {
  const { name, category, wage, description, duration, location } = req.body;

  if (!name || !category || !wage || !description || !duration || !location) {
    return next(new AppError("All fields are required", 400));
  }

  let existingCategory = await Category.findOne({ name: category });

  if (!existingCategory) {
    existingCategory = await Category.create({ name: category });
  }

  let uploadedImage = null;

  if (req.files && req.files.image) {
    uploadedImage = await uploadImages(req.files.image);
  }

  const job = await Job.create({
    name,
    category: existingCategory._id,
    wage,
    description,
    duration,
    location,
    image: uploadedImage,
  });

  res.status(201).json({
    success: true,
    job,
  });
});

const getAllJobs = asyncErrorHandler(async (req, res, next) => {
  const jobs = await Job.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: jobs.length,
    jobs,
  });
});

const updateJob = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category, wage, description, duration, location } =
    req.body || {};

  let job = await Job.findById(id);
  if (!job) return next(new AppError("Job not found", 404));

  // Handle category update
  if (category) {
    let existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      existingCategory = await Category.create({ name: category });
    }
    job.category = existingCategory._id;
  }

  // Handle image update
  if (req.files && req.files.image) {
    // delete old image from cloudinary
    if (job.image && job.image.public_id) {
      await cloudinary.uploader.destroy(job.image.public_id);
    }

    const uploadedImage = await uploadImages(req.files.image);
    job.image = uploadedImage;
  }

  // Update other fields
  if (name) job.name = name;
  if (wage) job.wage = wage;
  if (description) job.description = description;
  if (duration) job.duration = duration;
  if (location) job.location = location;

  await job.save();

  res.json({
    success: true,
    job,
  });
});

const deleteJob = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) return next(new AppError("Job not found", 404));

  if (job.image && job.image.public_id) {
    await cloudinary.uploader.destroy(job.image.public_id);
  }

  await job.deleteOne();

  res.json({
    success: true,
    message: "Job deleted successfully",
  });
});

module.exports = { createJob, getAllJobs, deleteJob, updateJob };
