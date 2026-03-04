const express = require("express");
const { restrictTo } = require("../Middlewares/restictAccess");
const {
  createJob,
  getAllJobs,
  deleteJob,
  updateJob,
} = require("../Controllers/Admins/admin.JobController");
const protect = require("../Middlewares/verifyuser");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management
 */

/**
 * @swagger
 * /api/gharsewa/add-job:
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
router.post("/add-job", protect, restrictTo("admin"), createJob);

/**
 * @swagger
 * /api/gharsewa/get-jobs:
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
 * /api/gharsewa/job/{id}/delete:
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
router.delete("/job/:id/delete", protect, restrictTo("admin"), deleteJob);

/**
 * @swagger
 * /api/gharsewa/job/{id}/update:
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
router.patch("/job/:id/update", protect, restrictTo("admin"), updateJob);

module.exports = router;
