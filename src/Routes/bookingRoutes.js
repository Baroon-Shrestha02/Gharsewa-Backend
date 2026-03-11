import express from "express";

import protect from "../middlewares/verifyUser.js";
import { restrictTo } from "../middlewares/restictAccess.js";

import {
  getAllBooking,
  updateBooking,
} from "../controllers/Roles/Staffs/staff.BookingControllers.js";
import {
  getBookings,
  jobBooking,
} from "../controllers/Roles/Workers/worker.BookingController.js";
import { getAllWorkers } from "../controllers/Roles/Workers/workerController.js";
import {
  getOneWorkers,
  getWorkers,
  requestWorkerForJob,
} from "../controllers/Roles/Users/user.BookingController.js";

const router = express.Router();

/**
 * @swagger
 * /api/booking/book-job/{id}:
 *   post:
 *     summary: Book a job by ID
 *     tags: [Booking]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID to book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job booked successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/book-job/:id", protect, jobBooking);

/**
 * @swagger
 * /api/booking/job-bookings:
 *   get:
 *     summary: Get bookings for the logged-in user
 *     tags: [Booking]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *       401:
 *         description: Unauthorized
 */
router.get("/job-bookings", protect, getBookings);

router.get("/all", protect, restrictTo("admin", "staff"), getAllBooking);

router.patch(
  "/update-booking/:id",
  protect,
  restrictTo("admin", "staff"),
  updateBooking,
);

// <---- user books worker ------->
router.get("/workers", getWorkers);

router.post("/:jobId/request-worker/:workerId", protect, requestWorkerForJob);

router.get("/get/:workerId", protect, getOneWorkers);

export default router;
