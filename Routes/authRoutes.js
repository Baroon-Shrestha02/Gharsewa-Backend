import express from "express";
import {
  registerUser,
  login,
  getLoggedUser,
  logout,
} from "../Controllers/authController.js";
import protect from "../Middlewares/verifyUser.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
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
 * /api/auth/login:
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
 * /api/auth/logged-user:
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
 * /api/auth/logout:
 *   get:
 *     summary: Logout user (clears auth cookie)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.get("/logout", logout);

export default router;
