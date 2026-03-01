const express = require("express");
const {
  registerUser,
  login,
  getLoggedUser,
  logout,
} = require("../Controllers/authController");
const protect = require("../Middlewares/verifyuser");
const { restrictTo } = require("../Middlewares/restictAccess");
const { getAllUser } = require("../Controllers/Users/adminController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logged-user", protect, getLoggedUser);
router.get("/logout", logout);

router.get("/all-users", protect, restrictTo("admin"), getAllUser);

module.exports = router;
