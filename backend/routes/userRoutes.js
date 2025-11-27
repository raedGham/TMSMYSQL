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
router.get("/getuser/:id", getUser);
router.get("/", getUsers);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", updateUser);
router.patch("/changepass", changePassword);
//router.post("/forgotpassword", protect, forgotPassword);
router.delete("/:id", deleteUser);
router.patch("/:id/type", updateType);

module.exports = router;
