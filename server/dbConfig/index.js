const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect("mongodb+srv://mohamedjuwar67:MyLife@cluster0.6tdry.mongodb.net/")
    .then(() => console.log("Connected"))
    .catch((error) => console.log(error));
};

module.exports = dbConnection;
