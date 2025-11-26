const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const upload = multer(); // For parsing multipart/form-data
const {
  newComplaint,
  getComplaints,
  getComplaint,
  deleteComplaint,
  updateComplaint,
} = require("../controllers/userComplaintsController");

router.post("/new", protect, upload.none(), newComplaint);
router.get("/", getComplaints);
router.get("/:id", getComplaint);
router.delete("/:id", protect, deleteComplaint);
router.patch("/:id", protect, upload.none(), updateComplaint);

module.exports = router;
