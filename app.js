import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import globalErrorHandler from "./Middlewares/errorHandler.js";

import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

import workerRoutes from "./Routes/workerRoutes.js";
import staffRoutes from "./Routes/staffRoutes.js";
import cookieParser from "cookie-parser";
import createAdminIfNotExists from "./Utils/CreateAdmin.js";

import swaggerUi from "swagger-ui-express";
import fileUpload from "express-fileupload";
import jobRoutes from "./Routes/jobRoutes.js";
import swaggerSpec from "./Config/swagger.js";

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

app.use("/api/workers", workerRoutes);
app.use("/api/staffs", staffRoutes);

app.use("/api/gharsewa", (req, res) => {
  res.send("working..");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(globalErrorHandler);

export default app;
