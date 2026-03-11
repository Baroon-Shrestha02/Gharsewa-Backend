import express from "express";
import { restrictTo } from "../middlewares/restictAccess.js";
import protect from "../middlewares/verifyUser.js";
import {
  createJob,
  getAllJobs,
  deleteJob,
  updateJob,
  getCategories,
} from "../controllers/Roles/Admins/admin.JobController.js";
import {
  deleteMyJob,
  getMyJobs,
  updateMyJob,
  userCreateJob,
} from "../controllers/Roles/Users/user.JobController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */

/**
 * @swagger
 * /api/jobs/add-job:
 *   post:
 *     summary: Create a new job (Admin only)
 *     tags: [Jobs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, category, wage, description, duration, location]
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: Category name (created if it does not exist)
 *               wage:
 *                 type: number
 *               description:
 *                 type: string
 *               duration:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.post(
  "/add-job",
  protect,
  restrictTo("user", "admin", "staff"),
  userCreateJob,
);

/**
 * @swagger
 * /api/jobs/get-jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */
router.get("/get-jobs", getAllJobs);

/**
 * @swagger
 * /api/jobs/delete/:id:
 *   delete:
 *     summary: Delete a job by ID (Admin only)
 *     tags: [Jobs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Job not found
 */
router.delete("/delete/:id", protect, restrictTo("admin"), deleteJob);

/**
 * @swagger
 * /api/jobs/update/:id:
 *   patch:
 *     summary: Update a job by ID (Admin only)
 *     tags: [Jobs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               wage:
 *                 type: number
 *               description:
 *                 type: string
 *               duration:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Job not found
 */
router.patch("/update/:id", protect, restrictTo("admin"), updateJob);

router.get("/get-categories", getCategories);

// <<<<------User CRUD for their jobs----->>>>
router.post(
  "/userJob",
  protect,
  restrictTo("admin", "staff", "user"),
  userCreateJob,
);

router.get("/getmyjobs", protect, getMyJobs);

// router.patch();
router.delete("/delete-job/:id", protect, deleteMyJob);

router.patch("/update-job/:id", protect, updateMyJob);

export default router;
