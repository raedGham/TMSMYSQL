const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const upload = multer(); // For parsing multipart/form-data
const {
  newActivity,
  getActivities,
  getActivity,
  deleteActivity,
  updateActivity,
} = require("../controllers/activitiesController");

router.post("/new", protect, upload.none(), newActivity);
router.get("/", getActivities);
router.get("/:id", getActivity);
router.delete("/:id", protect, deleteActivity);
router.patch("/:id", protect, upload.none(), updateActivity);

module.exports = router;
