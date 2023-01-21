const mongoose = require("mongoose");

// creating schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Creating a new collection
const User = new mongoose.model("User", userSchema);
module.exports = User;
