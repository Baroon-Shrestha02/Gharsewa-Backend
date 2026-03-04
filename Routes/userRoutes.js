import express from "express";
// import {
//   registerUser,
//   login,
//   getLoggedUser,
//   logout,
// } from "../Controllers/authController.js";
import protect from "../Middlewares/verifyUser.js";
import { restrictTo } from "../Middlewares/restictAccess.js";
import {
  getAllUser,
  updateActiveStatus,
  deleteInactiveUser,
} from "../Controllers/Admins/admin.UserController.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/all-users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.get("/all-users", protect, restrictTo("admin"), getAllUser);

/**
 * @swagger
 * /api/users/toggle-status/{id}:
 *   patch:
 *     summary: Toggle user's active status (Admin only)
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: User not found
 */
router.patch(
  "/toggle-status/:id",
  protect,
  restrictTo("admin"),
  updateActiveStatus,
);

/**
 * @swagger
 * /api/users//delete/{id}:
 *   delete:
 *     summary: Delete inactive user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: User not found
 */
router.delete("/delete/:id", protect, restrictTo("admin"), deleteInactiveUser);

export default router;
