const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const asyncHandler = require("express-async-handler");

// Get All Users - Admin only
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get Specific User - Admin only
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }
  res.status(200).json({ success: true, user });
});

// Update User (name, email, role) - Admin only
const updateUserById = asyncHandler(async (req, res) => {
  const { userName, email, role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  user.userName = userName || user.userName;
  user.email = email || user.email;
  user.role = role || user.role;

  await user.save();

  res.status(200).json({ success: true, user });
});

// Delete User - Admin only
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await User.findByIdAndDelete(req.params.id);

  // ✅ Clear the cookie if it exists
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax", // or "Strict"
    secure: process.env.NODE_ENV === "production",
  });

  res
    .status(200)
    .json({ success: true, message: "User deleted and cookie cleared" });
});

// Change User Password - Admin only
const changeUserPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  const hashPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashPassword;

  await user.save();

  res.status(200).json({ success: true, message: "Password updated" });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  changeUserPassword,
};
