const express = require("express");
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware"); // ✅ CORRECT IMPORT
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  changeUserPassword,
} = require("../../controllers/admin/Admin-controller");

const router = express.Router();

// // ✅ Apply middlewares correctly
// router.use(authMiddleware); // ✅ this must be a function
// // router.use(isAdmin); // ✅ same here

// ✅ Define routes
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUserById);
router.delete("/user/:id", deleteUserById);
router.put("/user/:id/password", changeUserPassword);

module.exports = router;
