const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    default: false,
    type: Boolean,
    required: true,
  },
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
