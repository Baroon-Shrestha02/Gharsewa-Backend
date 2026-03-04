require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Database = require("./Database/Database");
const globalErrorHandler = require("./Middlewares/ErrorHandler");
const cookieParser = require("cookie-parser");
const { createAdminIfNotExists } = require("./Utils/CreateAdmin");
const swaggerSpec = require("./Config/swagger");
const swaggerUi = require("swagger-ui-express");
const fileUpload = require("express-fileupload");

const authRoutes = require("./Routes/userRoutes");
const jobRoutes = require("./Routes/jobRoutes");

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

app.use("/api/gharsewa", authRoutes);
app.use("/api/gharsewa", jobRoutes);

app.use("/api/gharsewa", (req, res) => {
  res.send("working..");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(globalErrorHandler);

module.exports = app;
