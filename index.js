import dotenv from "dotenv";
dotenv.config();

import cloudinary from "cloudinary";
import app from "./app.js";

import Database from "./Database/Database.js";
import createAdminIfNotExists from "./Utils/CreateAdmin.js";

const PORT = process.env.PORT;

cloudinary.v2.config({
  cloud_name: process.env.API_USER,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

Database()
  .then(async () => {
    await createAdminIfNotExists(); // 👈 runs once safely

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
