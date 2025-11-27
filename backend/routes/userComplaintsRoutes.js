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

router.post("/new", upload.none(), newComplaint);
router.get("/", getComplaints);
router.get("/:id", getComplaint);
router.delete("/:id", deleteComplaint);
router.patch("/:id", upload.none(), updateComplaint);

module.exports = router;
