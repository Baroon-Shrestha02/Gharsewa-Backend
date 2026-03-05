import express from "express";
import {
  getBookings,
  jobBooking,
} from "../Controllers/Roles/Users/user.BookingController.js";
import protect from "../Middlewares/verifyUser.js";

const router = express.Router();

router.post("/book-job/:id", protect, jobBooking);
router.get("/job-bookings", protect, getBookings);

export default router;
