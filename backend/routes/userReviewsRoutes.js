const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviewsByTrip,
} = require("../controllers/userReviewsController");
const protect = require("../middleware/authMiddleware");

router.post("/", createReview); // submit review
router.get("/:tripID", getReviewsByTrip); // fetch trip reviews

module.exports = router;
