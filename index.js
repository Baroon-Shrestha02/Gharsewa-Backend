require("dotenv").config();
const app = require("./app");
const Database = require("./Database/Database");
const createAdminIfNotExists = require("./Utils/CreateAdmin");
const cloudinary = require("cloudinary").v2;

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.API_USER,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

Database()
  .then(async () => {
    await createAdminIfNotExists(); // 👈 runs once safely

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs: http://localhost:3000/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
