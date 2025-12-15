const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");

// Function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// --------------------------------------------------------------------
// REGISTER USER
// --------------------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, type, password } = req.body;

  if (!name || !email || !password || !type) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be min 6 characters" });
  }

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = await User.create({ name, email, type, password });

  const token = generateToken(user.id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "lax",
    secure: false,
  });

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
    token,
  });
});

// --------------------------------------------------------------------
// LOGIN USER
// --------------------------------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please add Email & password" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: "User not found, please sign up" });

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (passwordIsCorrect) {
    const token = generateToken(user.id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid Email or Password" });
  }
});

// --------------------------------------------------------------------
// LOGOUT USER
// --------------------------------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Successfully logged out" });
});

// --------------------------------------------------------------------
// GET SINGLE USER
// --------------------------------------------------------------------
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
  });
});

// --------------------------------------------------------------------
// GET ALL USERS
// --------------------------------------------------------------------
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({ order: [["name", "ASC"]] });
  res.status(200).json(users);
});

// --------------------------------------------------------------------
// LOGIN STATUS
// --------------------------------------------------------------------
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json(false);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    return res.json(!!verified);
  } catch {
    return res.json(false);
  }
});

// --------------------------------------------------------------------
// DELETE USER
// --------------------------------------------------------------------
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(400).json({ message: "Invalid user" });

  await user.destroy();
  res.status(200).json(user);
});

// --------------------------------------------------------------------
// UPDATE USER INFO
// --------------------------------------------------------------------
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.type = req.body.type || user.type;

  await user.save();

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
  });
});

// --------------------------------------------------------------------
// CHANGE PASSWORD
// --------------------------------------------------------------------
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, userID } = req.body;
  const user = await User.findByPk(userID);

  if (!user) return res.status(400).json({ message: "User not found" });
  if (!currentPassword || !newPassword) return res.status(400).json({ message: "Please add old and new password" });

  const passwordIsCorrect = await bcrypt.compare(currentPassword, user.password);

  if (!passwordIsCorrect) return res.status(400).json({ message: "Current Password is incorrect" });

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

// --------------------------------------------------------------------
// UPDATE USER TYPE
// --------------------------------------------------------------------
const updateType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!["normal", "superuser", "organizer"].includes(type)) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.type = type;
  await user.save();

  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  deleteUser,
  getUsers,
  loginStatus,
  updateUser,
  updateType,
  changePassword,
};
