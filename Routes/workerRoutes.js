const express = require("express");
const router = express.Router();

const {
  createWorker,
  getAllWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
} = require("../Controllers/Users/workerController");

const protect = require("../Middlewares/verifyUser");
const{ restrictTo }= require("../Middlewares/restictAccess");

// Public routes
router.get("/", getAllWorkers);
router.get("/:id", getWorkerById);

// Admin and Staff access only
router.post("/", protect, restrictTo("admin", "staff"), createWorker);

// Update the Admin , staff and own worker .

router.patch(
  "/:id",
  protect,
  restrictTo("admin", "staff", "worker"),
  updateWorker,
);

// Admin only
router.delete("/:id", protect, restrictTo("admin"), deleteWorker);

module.exports = router;
