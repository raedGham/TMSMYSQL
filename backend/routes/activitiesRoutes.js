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

router.post("/new", upload.none(), newActivity);
router.get("/", getActivities);
router.get("/:id", getActivity);
router.delete("/:id",  deleteActivity);
router.patch("/:id", upload.none(), updateActivity);

module.exports = router;
