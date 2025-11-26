const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const upload = multer(); // For parsing multipart/form-data
const {
  newFavorite,
  getFavorites,
  getFavorite,
  deleteFavorite,
  updateFavorite,
} = require("../controllers/userFavoritesController");

router.post("/new", protect, newFavorite);
router.get("/", getFavorites);
router.get("/:id", getFavorite);
router.delete("/:id", protect, deleteFavorite);
router.patch("/:id", protect, upload.none(), updateFavorite);

module.exports = router;
