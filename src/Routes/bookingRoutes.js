import express from "express";
import {
  getBookings,
  jobBooking,
} from "../Controllers/Roles/Users/user.BookingController.js";
import protect from "../Middlewares/verifyUser.js";

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

export default router;
