import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../models/Usermodel.js";

export const registerUser = asyncErrorHandler(async (req, res, next) => {
  const {
    firstname,
    middlename,
    lastname,
    phone,
    email,
    password,
    role,
    skill_type,
    experience_years,
  } = req.body;

  if (!firstname || !lastname || !phone || !email || !password) {
    return next(new AppError("Please fill all required fields.", 400));
  }

  // prevent admin creation from public API
  const allowedRoles = ["user", "worker"];

  const userRole = allowedRoles.includes(role) ? role : "user";

  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    return next(new AppError("User already exists.", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserData = {
    firstname,
    middlename,
    lastname,
    phone,
    email,
    password: hashedPassword,
    role: userRole,
  };

  // worker specific fields
  if (userRole === "worker") {
    if (!skill_type) {
      return next(new AppError("Worker must select a skill type.", 400));
    }

    newUserData.skill_type = skill_type;
    newUserData.experience_years = experience_years || 0;
  }

  const user = await User.create(newUserData);

  res.status(201).json({
    status: "success",
    message: `${userRole} registered successfully`,
    data: {
      id: user._id,
      role: user.role,
      email: user.email,
    },
  });
});

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required.", 400));
  }

  // find user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid credentials.", 401));
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials.", 401));
  }

  // create token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      status: "success",
      message: "Login successful",
      role: user.role,
    });
});

export const getLoggedUser = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const logout = asyncErrorHandler(async (req, res, next) => {
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

// export { registerUser, login, getLoggedUser, logout };
