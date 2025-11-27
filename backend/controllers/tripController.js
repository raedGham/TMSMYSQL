const asyncHandler = require("express-async-handler");
const Trip = require("../models/tripModel");
const TripImage = require("../models/tripImagesModel");
const Reservation = require("../models/reservationModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

// --------------------------------------------------------------------
// NEW TRIP
// --------------------------------------------------------------------
const newTrip = asyncHandler(async (req, res) => {
  try {
  const {
    title,
    destination,
    demographic,
    startDate,
    endDate,
    pricePerPerson,
    organizerID,
  } = req.body;
 console.log(organizerID);

  if (!title || !destination || !demographic || !startDate || !endDate || !req.file) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const trip = await Trip.create({
    title,
    destination,
    demographic,
    startDate,
    endDate,
    pricePerPerson,
    organizerID,
    thumbnail:path.join("uploads", "thumbs", req.file.filename), 
  });

  res.status(201).json(trip);
} catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ 
      message: 'Error creating trip', 
      error: error.message 
    });
  }

});

// --------------------------------------------------------------------
// GET ALL TRIPS
// --------------------------------------------------------------------
const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.findAll({
    include: [{ model: User, as: "organizer", attributes: ["id", "name", "email"] }],
    order: [["startDate", "ASC"]],
  });
  res.status(200).json(trips);
});

// --------------------------------------------------------------------
// GET SINGLE TRIP
// --------------------------------------------------------------------
const getTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findByPk(req.params.id, {
    include: [{ model: User, as: "organizer", attributes: ["id", "name", "email"] }],
  });

  if (!trip) return res.status(400).json({ message: "Invalid trip" });

  res.status(200).json(trip);
});

// --------------------------------------------------------------------
// UPDATE TRIP
// --------------------------------------------------------------------
const updateTrip = asyncHandler(async (req, res) => {
  const { title, destination, demographic, startDate, endDate, pricePerPerson, organizerID } = req.body;

  const trip = await Trip.findByPk(req.params.id);

  if (!trip) return res.status(400).json({ message: "Invalid trip" });

  trip.title = title ?? trip.title;
  trip.destination = destination ?? trip.destination;
  trip.demographic = demographic ?? trip.demographic;
  trip.startDate = startDate ?? trip.startDate;
  trip.endDate = endDate ?? trip.endDate;
  trip.pricePerPerson = pricePerPerson ?? trip.pricePerPerson;
  trip.organizerID = organizerID ?? trip.organizerID;

  await trip.save();
  res.status(200).json(trip);
});

// --------------------------------------------------------------------
// DELETE TRIP
// --------------------------------------------------------------------
const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findByPk(req.params.id);

  if (!trip) return res.status(400).json({ message: "Invalid trip" });

  await trip.destroy();
  res.status(200).json(trip);
});

// --------------------------------------------------------------------
// ADD IMAGES
// --------------------------------------------------------------------
const addImages = asyncHandler(async (req, res) => {
  const trip = await Trip.findByPk(req.params.id);
  if (!trip) return res.status(404).json({ message: "Trip not found" });

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No images uploaded" });
  }

  const records = req.files.map((f) => ({
    tripID: trip.id,
    path: path.join("uploads", path.basename(f.path)),
    originalName: f.originalname,
    mimeType: f.mimetype,
    size: f.size,
  }));

  const saved = await TripImage.bulkCreate(records);

  res.status(201).json({ message: "Images uploaded", images: saved });
});

// --------------------------------------------------------------------
// GET IMAGES
// --------------------------------------------------------------------
const getImages = asyncHandler(async (req, res) => {
  const images = await TripImage.findAll({
    where: { tripID: req.params.id },
    order: [["createdAt", "DESC"]],
  });
  res.json(images);
});

// --------------------------------------------------------------------
// DELETE IMAGE
// --------------------------------------------------------------------
const delImage = asyncHandler(async (req, res) => {
  const { tripId, imageId } = req.params;
  const img = await TripImage.findOne({ where: { id: imageId, tripID: tripId } });

  if (!img) return res.status(404).json({ message: "Image not found" });

  const filePath = path.join(__dirname, "..", img.path);
  fs.unlink(filePath, (err) => {
    if (err) console.warn("Could not delete file:", err.message);
  });

  await img.destroy();
  res.json({ message: "Image deleted" });
});

// --------------------------------------------------------------------
// CHECK RESERVATION
// --------------------------------------------------------------------
const checkReservation = asyncHandler(async (req, res) => {
  const { tripID, userID } = req.params;

  const exists = await Reservation.findOne({ where: { tripID, userID } });
  return res.json({ reserved: !!exists });
});

module.exports = {
  newTrip,
  getTrips,
  deleteTrip,
  updateTrip,
  checkReservation,
  getTrip,
  addImages,
  getImages,
  delImage,
};
