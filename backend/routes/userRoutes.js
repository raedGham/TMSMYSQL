const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
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
 
} = require("../controllers/userController"); // ctrl + spacebar
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser/:id", protect, getUser);
router.get("/", getUsers);
router.get("/loggedin", protect, loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepass", protect, changePassword);
//router.post("/forgotpassword", protect, forgotPassword);
router.delete("/:id", deleteUser);
router.patch("/:id/type", protect, updateType);

module.exports = router;
