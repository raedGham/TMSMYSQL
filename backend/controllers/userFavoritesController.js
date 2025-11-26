const asyncHandler = require("express-async-handler");
const Favorite = require("../models/userFavoritesModel");

// --------------------------------------------------------------------
//  N E W FAVORITE
// --------------------------------------------------------------------
const newFavorite = asyncHandler(async (req, res) => {
  const { tripID, userID, rating } = req.body;

  if (!tripID || !userID) {
    return res.status(400).json({ message: "tripID and userID are required" });
  }

  const favorite = await Favorite.create({
    tripID,
    userID,
    rating,
  });

  res.status(201).json(favorite);
});

// --------------------------------------------------------------------
//  GET ALL FAVORITES
// --------------------------------------------------------------------
const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.findAll();
  res.status(200).json(favorites);
});

// --------------------------------------------------------------------
//  GET SINGLE FAVORITE
// --------------------------------------------------------------------
const getFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findByPk(req.params.id);

  if (!favorite) {
    return res.status(400).json({ message: "Invalid favorite" });
  }

  res.status(200).json(favorite);
});

// --------------------------------------------------------------------
//  UPDATE FAVORITE
// --------------------------------------------------------------------
const updateFavorite = asyncHandler(async (req, res) => {
  const { tripID, userID, rating } = req.body;

  const favorite = await Favorite.findByPk(req.params.id);

  if (!favorite) {
    return res.status(400).json({ message: "Invalid favorite" });
  }

  favorite.tripID = tripID ?? favorite.tripID;
  favorite.userID = userID ?? favorite.userID;
  if (rating !== undefined) favorite.rating = rating;

  await favorite.save();

  res.status(200).json(favorite);
});

// --------------------------------------------------------------------
//  DELETE FAVORITE
// --------------------------------------------------------------------
const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findByPk(req.params.id);

  if (!favorite) {
    return res.status(400).json({ message: "Invalid favorite" });
  }

  await favorite.destroy();

  res.status(200).json(favorite);
});

// --------------------------------------------------------------------
//  RATE TRIP
// --------------------------------------------------------------------
const rateTrip = asyncHandler(async (req, res) => {
  const { tripID, userID, rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  // Find existing favorite
  let favorite = await Favorite.findOne({ where: { tripID, userID } });

  if (favorite) {
    favorite.rating = rating;
    await favorite.save();
  } else {
    favorite = await Favorite.create({ tripID, userID, rating });
  }

  res.status(200).json(favorite);
});

module.exports = {
  newFavorite,
  getFavorites,
  deleteFavorite,
  updateFavorite,
  getFavorite,
  rateTrip,
};
