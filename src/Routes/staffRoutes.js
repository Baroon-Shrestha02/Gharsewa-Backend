import express from "express";
import { restrictTo } from "../Middlewares/restictAccess.js";
import protect from "../Middlewares/verifyUser.js";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} from "../Controllers/Roles/Staffs/staffController.js";

const router = express.Router();

router.post("/", protect, restrictTo("admin"), createStaff);

router.get("/", protect, restrictTo("admin", "staff"), getAllStaff);

router.get("/:id", protect, restrictTo("admin", "staff"), getStaffById);

router.patch("/:id", protect, restrictTo("admin", "staff"), updateStaff);

router.delete("/:id", protect, restrictTo("admin"), deleteStaff);

export default router;
