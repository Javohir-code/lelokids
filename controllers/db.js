const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to Mongodb...");
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = db;
