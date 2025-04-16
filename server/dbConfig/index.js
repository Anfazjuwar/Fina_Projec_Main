const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");
  } catch (error) {
    console.error("Connection error:", error);
  }
};

module.exports = dbConnection;
