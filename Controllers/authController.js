const bcrypt = require("bcrypt");
const AppError = require("../Utils/AppError");
const asyncErrorHandler = require("../Utils/AsyncErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { firstname, middlename, lastname, phone, email, password, role } =
    req.body;

  if (!firstname || !lastname || !phone || !email || !password) {
    return next(new AppError("Please fill all the required fields.", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User with this email already registered.", 400));
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    firstname,
    middlename,
    lastname,
    phone,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      id: user._id,
      email: user.email,
    },
  });
});

const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required.", 400));
  }

  const user = await User.findOne({ email });

  if (!user) return next(new AppError("Invalid credentials.", 401));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials.", 401));
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false, // set true only in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      status: "success",
      message: "Login successful",
    });
});

const getLoggedUser = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

const logout = asyncErrorHandler(async (req, res, next) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

module.exports = { registerUser, login, getLoggedUser, logout };
