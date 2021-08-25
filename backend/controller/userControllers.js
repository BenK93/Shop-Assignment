const Users = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const JWT_SECRET =
  "549554ef32c482a2da4c562a9f1b15a0f4952789c3afb987f16451b2fbc3632e080da7081ce8f7db57259f1bc43ab73f2c60861e886ac4920fdf26110d310b1";

const registerUser = async (req, res) => {
  const { email, password: plainTextPassword, isAdmin, fullName } = req.body;
  if (
    !email ||
    !plainTextPassword ||
    (!isAdmin && isAdmin == undefined) ||
    !fullName
  ) {
    res.status(400).json({
      error:
        "Missing one of the following (fullName, email, password, isAdmin)",
    });
  }
  if (plainTextPassword.length < 8) {
    return res.json({
      status: "error",
      error: "Password Should be at least 8 characters",
    });
  }
  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const user = await Users.create({
      fullName,
      email,
      password,
      isAdmin,
    });
    console.log("User created successfully: ", user);
    const accessToken = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const response = { ...user._doc, token: accessToken };
    return res.status(200).json(response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res
        .status(400)
        .json({ status: "error", error: "Email already in use" });
    }
    throw error;
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email }).lean();

  if (!user) {
    return res
      .status(401)
      .json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the email, password combination is successful
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET
    );

    return res.json({
      status: "ok",
      token: token,
      isAdmin: user.isAdmin,
      email: user.email,
    });
  }

  res.json({ status: "error", error: "Invalid username/password" });
};

module.exports = {
  registerUser,
  loginUser,
};
