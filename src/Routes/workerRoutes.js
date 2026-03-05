import express from "express";
import {
  createWorker,
  deleteWorker,
  getAllWorkers,
  getWorkerById,
  updateWorker,
} from "../Controllers/Roles/Workers/workerController.js";
import protect from "../Middlewares/verifyUser.js";
import { restrictTo } from "../Middlewares/restictAccess.js";

const router = express.Router();

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

export default router;
