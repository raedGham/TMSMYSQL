const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTripImages");
const uploadThumb = require("../middleware/uploadThumbnail");
const protect = require("../middleware/authMiddleware");

const {
  newTrip,
  getTrips,
  getTrip,
  deleteTrip,
  updateTrip,
  addImages,
  getImages,
  delImage,
  checkReservation,
} = require("../controllers/tripController");

//image Routes

router.post("/images/:id", protect, upload.array("images", 10), addImages);
router.get("/images/:id", getImages);
router.delete("/:tripId/images/:imageId", protect, delImage);

// TRIP ROUTES
router.get("/check/:tripID/:userID", checkReservation);
router.post("/new", protect, uploadThumb.single("thumbnail"), newTrip);
router.get("/", getTrips);
router.get("/:id", getTrip);
router.delete("/:id", protect, deleteTrip);
router.patch("/:id", upload.none(), updateTrip);

module.exports = router;
