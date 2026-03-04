// const bcrypt = require("bcrypt");
// const User = require("../Utils/CreateAdmin");

// const createAdminIfNotExists = async () => {
//   const adminExists = await User.findOne({ role: "admin" });

//   if (adminExists) {
//     console.log("Admin already exists");
//     return;
//   }

//   const hashedPassword = await bcrypt.hash("admin123", 10);

//   await User.create({
//     firstname: "Super",
//     lastname: "Admin",
//     phone: 9812345678,
//     email: "admin@gmail.com",
//     password: hashedPassword,
//     role: "admin",
//   });

//   console.log("Admin created successfully");
// };

// module.exports = createAdminIfNotExists;

const bcrypt = require("bcrypt");
const User = require("../Models/userModel");

const createAdminIfNotExists = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      firstname: "Super",
      lastname: "Admin",
      phone: "9812345678",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = createAdminIfNotExists;
