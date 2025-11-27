const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const upload = multer(); // For parsing multipart/form-data
const {
  newTransportation,
  getTransportations,
  getTransportation,
  deleteTransportation,
  updateTransportation,
} = require("../controllers/transportationController");

router.post("/new", upload.none(), newTransportation);
router.get("/", getTransportations);
router.get("/:id", getTransportation);
router.delete("/:id",deleteTransportation);
router.patch("/:id",upload.none(), updateTransportation);

module.exports = router;
