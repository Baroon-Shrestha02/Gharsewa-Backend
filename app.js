require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Database = require("./Database/Database");
const globalErrorHandler = require("./Middlewares/ErrorHandler");
const authRoutes = require("./Routes/userRoutes");
const workerRoutes=require("./Routes/workerRoutes")
const staffRoutes=require('./Routes/staffRoutes')
const cookieParser = require("cookie-parser");
const { createAdminIfNotExists } = require("./Utils/CreateAdmin");
const swaggerSpec = require("./Config/swagger");
const swaggerUi = require("swagger-ui-express");


const app = express();

const allowedOrigins = ["http://localhost:5173"];

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
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", authRoutes);
app.use("/api/worker",workerRoutes);
app.use("/api/staffs",staffRoutes)

app.use("/api/gharsewa", (req, res) => {
  res.send("working..");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(globalErrorHandler);

module.exports = app;
