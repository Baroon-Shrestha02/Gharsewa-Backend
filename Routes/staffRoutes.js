const express = require("express");
const router = express.Router();

const {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require("../Controllers/Users/staffController");

const protect  = require("../Middlewares/verifyUser");
const { restrictTo } = require("../Middlewares/restictAccess");

router.post("/", protect, restrictTo("admin"), createStaff);

router.get("/", protect, restrictTo("admin", "staff"), getAllStaff);

router.get("/:id", protect, restrictTo("admin", "staff"), getStaffById);

router.patch("/:id", protect, restrictTo("admin", "staff"), updateStaff);

router.delete("/:id", protect, restrictTo("admin"), deleteStaff);

module.exports = router;
