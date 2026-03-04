const express = require("express");
const {
  registerUser,
  login,
  getLoggedUser,
  logout,
} = require("../Controllers/authController");
const protect = require("../Middlewares/verifyUser");//file path issue problem 
const { restrictTo } = require("../Middlewares/restictAccess");
const {
  getAllUser,
  updateActiveStatus,
  deleteInactiveUser,
} = require("../Controllers/Admins/admin.UserController");

const router = express.Router();

/**
 * @swagger
 * /api/gharsewa/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstname, lastname, phone, email, password]
 *             properties:
 *               firstname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 15
 *               middlename:
 *                 type: string
 *               lastname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *               phone:
 *                 type: number
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [user, staff, admin, worker]
 *                 default: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already registered
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/gharsewa/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful - JWT token set in httpOnly cookie
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /api/gharsewa/logged-user:
 *   get:
 *     summary: Get currently logged-in user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *       401:
 *         description: Unauthorized - not logged in
 */
router.get("/logged-user", protect, getLoggedUser);

/**
 * @swagger
 * /api/gharsewa/logout:
 *   get:
 *     summary: Logout user (clears auth cookie)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.get("/logout", logout);

/**
 * @swagger
 * /api/gharsewa/all-users:
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
 * /api/gharsewa/users/{id}/toggle-status:
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
  "/users/:id/toggle-status",
  protect,
  restrictTo("admin"),
  updateActiveStatus,
);

/**
 * @swagger
 * /api/gharsewa/users/{id}/delete:
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
router.delete(
  "/users/:id/delete",
  protect,
  restrictTo("admin"),
  deleteInactiveUser,
);

module.exports = router;
