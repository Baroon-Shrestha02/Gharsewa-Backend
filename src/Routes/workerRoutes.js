import express from "express";
import {
  createWorker,
  deleteWorker,
  getAllWorkers,
  getWorkerById,
  updateWorker,
} from "../controllers/Roles/Workers/workerController.js";
import protect from "../middlewares/verifyUser.js";
import { restrictTo } from "../middlewares/restictAccess.js";

const router = express.Router();

/**
 * @swagger
 * /api/workers:
 *   get:
 *     summary: Get all workers
 *     tags: [Workers]
 *     responses:
 *       200:
 *         description: List of workers
 */
router.get("/", getAllWorkers);

/**
 * @swagger
 * /api/workers/{id}:
 *   get:
 *     summary: Get worker by ID
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Worker ID
 *     responses:
 *       200:
 *         description: Worker details
 *       404:
 *         description: Worker not found
 */
router.get("/:id", getWorkerById);

/**
 * @swagger
 * /api/workers:
 *   post:
 *     summary: Create a new worker
 *     tags: [Workers]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               job:
 *                 type: string
 *                 description: Related job ID
 *     responses:
 *       201:
 *         description: Worker created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin or staff access required
 */
router.post("/", protect, restrictTo("admin", "staff"), createWorker);

/**
 * @swagger
 * /api/workers/{id}:
 *   patch:
 *     summary: Update worker details
 *     tags: [Workers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Worker ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               job:
 *                 type: string
 *     responses:
 *       200:
 *         description: Worker updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin, staff, or worker access required
 *       404:
 *         description: Worker not found
 */
router.patch(
  "/:id",
  protect,
  restrictTo("admin", "staff", "worker"),
  updateWorker,
);

/**
 * @swagger
 * /api/workers/{id}:
 *   delete:
 *     summary: Delete a worker
 *     tags: [Workers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Worker ID
 *     responses:
 *       200:
 *         description: Worker deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Worker not found
 */
router.delete("/:id", protect, restrictTo("admin"), deleteWorker);

export default router;
