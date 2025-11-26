const asyncHandler = require("express-async-handler");
const Review = require("../models/userReviewsModel");
const User = require("../models/userModel");

// Create a new review
exports.createReview = asyncHandler(async (req, res) => {
  try {
    const { tripID, rating, comment, userID } = req.body;

    if (!tripID || !rating || !comment || !userID) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await Review.create({
      tripID,
      userID,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get reviews by trip with user info
exports.getReviewsByTrip = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { tripID: req.params.tripID },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
