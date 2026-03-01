require("dotenv").config();
const app = require("./app");
const Database = require("./Database/Database");
const createAdminIfNotExists = require("./Utils/CreateAdmin");

const PORT = process.env.PORT || 5000;

Database()
  .then(async () => {
    await createAdminIfNotExists(); // 👈 runs once safely

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Swagger docs on http://localhost:3000/api-docs");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
