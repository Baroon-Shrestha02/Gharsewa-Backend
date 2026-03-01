const { default: mongoose } = require("mongoose");

const Uri = process.env.URI;
const Database = async () => {
  try {
    await mongoose.connect(Uri);
    console.log("Database connected successfull.");
  } catch (error) {
    return error.message;
  }
};

module.exports = Database;
